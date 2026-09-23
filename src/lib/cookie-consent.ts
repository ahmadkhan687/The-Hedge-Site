export const COOKIE_CONSENT_KEY = "thc_cookie_consent_v1";

export type CookieConsent = {
  /** User has made a choice (accept / reject / save). */
  decided: boolean;
  /** Optional analytics cookies (GTM). Off by default until accepted. */
  analytics: boolean;
};

export const DEFAULT_CONSENT: CookieConsent = {
  decided: false,
  analytics: false,
};

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (typeof parsed.decided !== "boolean") return null;
    return {
      decided: parsed.decided,
      analytics: Boolean(parsed.analytics),
    };
  } catch {
    return null;
  }
}

export function writeCookieConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent("thc:cookie-consent", { detail: consent }),
  );
}

export function hasAnalyticsConsent(): boolean {
  const consent = readCookieConsent();
  return Boolean(consent?.decided && consent.analytics);
}
