export type GlobePulse = {
  id: string;
  latitude: number;
  longitude: number;
  city: string | null;
  countryName: string | null;
  content: string | null;
  source: string | null;
};

export const UNKNOWN_LOCATION = "Unknown Location";

/** Approximate country centroids when post/city coords are missing. */
export const COUNTRY_CENTROIDS: Record<string, [number, number]> = {
  "united states": [39.83, -98.59],
  usa: [39.83, -98.59],
  us: [39.83, -98.59],
  india: [20.59, 78.96],
  in: [20.59, 78.96],
  "united kingdom": [54.0, -2.5],
  gb: [54.0, -2.5],
  uk: [54.0, -2.5],
  canada: [56.13, -106.35],
  ca: [56.13, -106.35],
  australia: [-25.27, 133.78],
  au: [-25.27, 133.78],
  germany: [51.17, 10.45],
  de: [51.17, 10.45],
  france: [46.23, 2.21],
  fr: [46.23, 2.21],
  brazil: [-14.24, -51.93],
  br: [-14.24, -51.93],
  japan: [36.2, 138.25],
  jp: [36.2, 138.25],
  "united arab emirates": [23.42, 53.85],
  ae: [23.42, 53.85],
  singapore: [1.35, 103.82],
  sg: [1.35, 103.82],
  "south africa": [-30.56, 22.94],
  za: [-30.56, 22.94],
  egypt: [26.82, 30.8],
  eg: [26.82, 30.8],
  china: [35.86, 104.2],
  cn: [35.86, 104.2],
  pakistan: [30.38, 69.35],
  pk: [30.38, 69.35],
  nigeria: [9.08, 8.68],
  ng: [9.08, 8.68],
  indonesia: [-0.79, 113.92],
  id: [-0.79, 113.92],
  mexico: [23.63, -102.55],
  mx: [23.63, -102.55],
  italy: [41.87, 12.57],
  it: [41.87, 12.57],
  spain: [40.46, -3.75],
  es: [40.46, -3.75],
  "saudi arabia": [23.89, 45.08],
  sa: [23.89, 45.08],
  turkey: [38.96, 35.24],
  tr: [38.96, 35.24],
  "south korea": [35.91, 127.77],
  kr: [35.91, 127.77],
  netherlands: [52.13, 5.29],
  nl: [52.13, 5.29],
};

/** Module-level cache so identical coords reuse reverse-geocode results. */
const reverseGeoCache = new Map<string, string>();

export function coordsCacheKey(lat: number, lon: number): string {
  return `${lat.toFixed(3)},${lon.toFixed(3)}`;
}

export function lookupCountryCentroid(
  countryName?: string | null,
  countryCode?: string | null,
): [number, number] | null {
  const keys = [countryName, countryCode]
    .filter(Boolean)
    .map((k) => String(k).trim().toLowerCase());
  for (const key of keys) {
    const hit = COUNTRY_CENTROIDS[key];
    if (hit) return hit;
  }
  return null;
}

export function truncateContent(
  text: string | null | undefined,
  max = 120,
): string | null {
  if (!text) return null;
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1)}…`;
}

type ReverseGeoResponse = {
  countryName?: string;
  city?: string;
  locality?: string;
  principalSubdivision?: string;
};

async function reverseGeocodeOnce(
  latitude: number,
  longitude: number,
): Promise<string> {
  const key = coordsCacheKey(latitude, longitude);
  const cached = reverseGeoCache.get(key);
  if (cached) return cached;

  try {
    const url = new URL(
      "https://api.bigdatacloud.net/data/reverse-geocode-client",
    );
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("localityLanguage", "en");

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      cache: "force-cache",
    });

    if (!res.ok) {
      reverseGeoCache.set(key, UNKNOWN_LOCATION);
      return UNKNOWN_LOCATION;
    }

    const data = (await res.json()) as ReverseGeoResponse;

    const resolved =
      data.countryName?.trim() ||
      data.city?.trim() ||
      data.locality?.trim() ||
      data.principalSubdivision?.trim() ||
      UNKNOWN_LOCATION;

    reverseGeoCache.set(key, resolved);
    return resolved;
  } catch {
    reverseGeoCache.set(key, UNKNOWN_LOCATION);
    return UNKNOWN_LOCATION;
  }
}

/** Resolve display location; reuses cache for identical coordinates. */
export async function resolveLocationName(
  countryName: string | null | undefined,
  latitude: number,
  longitude: number,
): Promise<string> {
  const existing = countryName?.trim();
  if (existing) return existing;

  const key = coordsCacheKey(latitude, longitude);
  const cached = reverseGeoCache.get(key);
  if (cached) return cached;

  return reverseGeocodeOnce(latitude, longitude);
}

/** Run reverse geocode for unique coords with limited concurrency. */
export async function resolveMissingCountries(
  items: Array<{
    countryName: string | null;
    latitude: number;
    longitude: number;
  }>,
): Promise<string[]> {
  const results: string[] = new Array(items.length);
  const pending = new Map<string, Promise<string>>();

  async function forItem(i: number) {
    const item = items[i];
    const existing = item.countryName?.trim();
    if (existing) {
      results[i] = existing;
      return;
    }

    const key = coordsCacheKey(item.latitude, item.longitude);
    let promise = pending.get(key);
    if (!promise) {
      promise = reverseGeocodeOnce(item.latitude, item.longitude);
      pending.set(key, promise);
    }
    results[i] = await promise;
  }

  const concurrency = 5;
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      await forItem(current);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );

  return results;
}
