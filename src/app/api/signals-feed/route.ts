import { NextResponse } from "next/server";
import {
  type GlobePulse,
  lookupCountryCentroid,
  resolveMissingCountries,
  UNKNOWN_LOCATION,
} from "@/lib/globe-pulses";

const MAX_PULSES = 50;
/** Serve cached pulses for a minute so the globe isn't waiting on upstream every hit. */
const CACHE_TTL_MS = 60_000;

type CacheEntry = {
  pulses: GlobePulse[];
  expiresAt: number;
};

let pulseCache: CacheEntry | null = null;
let inFlight: Promise<GlobePulse[]> | null = null;

/** Upstream field aliased to opaque `id` for our app layer. */
const RESULTS_QUERY = `
query RealtimePosts($filter: FilterInput!, $options: ResultsOptionsInput) {
  results(filter: $filter, options: $options) {
    total
    nextCursor
    results {
      id: pulsarId
      content
      publishedAt
      source
      sentiment
      engagement
      countryCode
      countryName
      city
      region
      latitude
      longitude
      userCountryCode
      userCity
      userLatitude
      userLongitude
    }
  }
}
`;

const CITY_COORDS_QUERY = `
query CityCoordinates(
  $filter: FilterInput!
  $options: MultipleOptionsInput
  $nestedOptions: DistinctNestedOptionsInput
) {
  sentiments(filter: $filter, options: $options) {
    cityLocations(options: $nestedOptions) {
      label
      value
      metadata
    }
  }
}
`;

type FeedPost = {
  id?: string;
  content?: string | null;
  publishedAt?: string | null;
  source?: string | null;
  sentiment?: number | null;
  engagement?: number | null;
  countryCode?: string | null;
  countryName?: string | null;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  userCountryCode?: string | null;
  userCity?: string | null;
  userLatitude?: number | null;
  userLongitude?: number | null;
};

type CityLoc = {
  label?: string;
  metadata?: {
    latitude?: number;
    longitude?: number;
    city?: string;
    country?: string;
  } | null;
};

async function feedGraphQL(
  query: string,
  variables: Record<string, unknown>,
  token: string,
  upstreamUrl: string,
) {
  const res = await fetch(upstreamUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("unavailable");
  }

  const json = (await res.json()) as {
    data?: Record<string, unknown>;
    errors?: unknown;
  };

  if (json.errors) {
    throw new Error("unavailable");
  }

  return json.data;
}

function resolveCoords(
  post: FeedPost,
  cityCoords: Map<string, { latitude: number; longitude: number }>,
): { latitude: number; longitude: number } | null {
  if (typeof post.latitude === "number" && typeof post.longitude === "number") {
    return { latitude: post.latitude, longitude: post.longitude };
  }
  if (
    typeof post.userLatitude === "number" &&
    typeof post.userLongitude === "number"
  ) {
    return { latitude: post.userLatitude, longitude: post.userLongitude };
  }

  const cityKeys = [post.city, post.userCity]
    .filter(Boolean)
    .map((c) => String(c).toLowerCase());
  for (const key of cityKeys) {
    const hit = cityCoords.get(key);
    if (hit) return hit;
  }

  const centroid = lookupCountryCentroid(
    post.countryName,
    post.countryCode ?? post.userCountryCode,
  );
  if (centroid) {
    return { latitude: centroid[0], longitude: centroid[1] };
  }

  return null;
}

function emptyPulses() {
  return NextResponse.json(
    { pulses: [] as GlobePulse[] },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

function pulsesResponse(pulses: GlobePulse[], fromCache: boolean) {
  return NextResponse.json(
    { pulses },
    {
      headers: {
        // Brief browser/CDN hint; primary speedup is server memory cache + client storage.
        "Cache-Control": fromCache
          ? "public, max-age=30, stale-while-revalidate=30"
          : "public, max-age=15, stale-while-revalidate=45",
      },
    },
  );
}

async function fetchLivePulses(
  token: string,
  searchHash: string,
  upstreamUrl: string,
): Promise<GlobePulse[]> {
  const now = new Date();
  const since = new Date(now.getTime() - 60 * 60 * 1000);
  const filter = {
    searchIds: [searchHash],
    dateFrom: since.toISOString(),
    dateTo: now.toISOString(),
  };

  const [resultsData, geoData] = await Promise.all([
    feedGraphQL(
      RESULTS_QUERY,
      {
        filter,
        options: {
          limit: 100,
          sortBy: "TIME",
          sort: "DESC",
        },
      },
      token,
      upstreamUrl,
    ),
    feedGraphQL(
      CITY_COORDS_QUERY,
      {
        filter,
        options: { limit: 3 },
        nestedOptions: { limit: 250, mincount: 1 },
      },
      token,
      upstreamUrl,
    ),
  ]);

  const resultsPayload = resultsData?.results as
    | { results?: FeedPost[] }
    | undefined;

  const cityCoords = new Map<
    string,
    { latitude: number; longitude: number }
  >();
  const sentiments =
    (geoData?.sentiments as { cityLocations?: CityLoc[] }[]) ?? [];
  for (const bucket of sentiments) {
    for (const loc of bucket.cityLocations ?? []) {
      const lat = loc.metadata?.latitude;
      const lon = loc.metadata?.longitude;
      const label = loc.label ?? loc.metadata?.city;
      if (
        typeof lat === "number" &&
        typeof lon === "number" &&
        typeof label === "string"
      ) {
        cityCoords.set(label.toLowerCase(), {
          latitude: lat,
          longitude: lon,
        });
      }
    }
  }

  const seen = new Set<string>();
  const draft: Array<{
    id: string;
    latitude: number;
    longitude: number;
    city: string | null;
    countryName: string | null;
    content: string | null;
    source: string | null;
  }> = [];

  for (const post of resultsPayload?.results ?? []) {
    const coords = resolveCoords(post, cityCoords);
    if (!coords) continue;

    const city = post.city || post.userCity || null;
    const countryName = post.countryName?.trim() || null;
    const locationKey = `${coords.latitude.toFixed(2)},${coords.longitude.toFixed(2)}`;
    if (seen.has(locationKey)) continue;
    seen.add(locationKey);

    draft.push({
      id: post.id ?? locationKey,
      latitude: coords.latitude,
      longitude: coords.longitude,
      city,
      countryName,
      content: post.content?.replace(/\s+/g, " ").trim() || null,
      source: post.source ?? null,
    });

    if (draft.length >= MAX_PULSES) break;
  }

  const resolvedCountries = await resolveMissingCountries(
    draft.map((p) => ({
      countryName: p.countryName,
      latitude: p.latitude,
      longitude: p.longitude,
    })),
  );

  return draft.map((p, i) => ({
    ...p,
    countryName: resolvedCountries[i]?.trim() || UNKNOWN_LOCATION,
  }));
}

/**
 * Server-only signals feed. Never call the upstream provider from the browser.
 * Failures return an empty list — no technical details in the response.
 */
export async function GET() {
  try {
    const token = process.env.FEED_API_TOKEN?.trim();
    const searchHash = process.env.FEED_SEARCH_HASH?.trim();
    const upstreamUrl = process.env.FEED_UPSTREAM_URL?.trim();

    if (!token || !searchHash || !upstreamUrl) {
      return emptyPulses();
    }

    const now = Date.now();
    if (pulseCache && pulseCache.expiresAt > now) {
      return pulsesResponse(pulseCache.pulses, true);
    }

    // Deduplicate concurrent cold requests so only one upstream round-trip runs.
    if (!inFlight) {
      inFlight = fetchLivePulses(token, searchHash, upstreamUrl)
        .then((pulses) => {
          pulseCache = {
            pulses,
            expiresAt: Date.now() + CACHE_TTL_MS,
          };
          return pulses;
        })
        .finally(() => {
          inFlight = null;
        });
    }

    const pulses = await inFlight;
    return pulsesResponse(pulses, false);
  } catch {
    if (pulseCache?.pulses.length) {
      return pulsesResponse(pulseCache.pulses, true);
    }
    return emptyPulses();
  }
}
