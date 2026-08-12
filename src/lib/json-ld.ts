/**
 * Serialize JSON-LD for embedding in <script type="application/ld+json">.
 * Escapes `<` so payload cannot break out of the script tag.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Hedge Collective",
  url: "https://thehedgecollective.co.uk/",
} as const;
