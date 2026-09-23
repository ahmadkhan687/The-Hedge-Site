"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DEFAULT_CONSENT,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

const btnBase =
  "inline-flex w-full items-center justify-center rounded-[2px] px-5 py-3 font-archivo-narrow text-[13px] font-bold uppercase transition-opacity sm:w-auto sm:px-7 sm:py-3.5 sm:text-[15px]";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);

  useEffect(() => {
    const existing = readCookieConsent();
    if (existing?.decided) {
      setVisible(false);
      setAnalyticsOn(existing.analytics);
      return;
    }
    setVisible(true);
    setAnalyticsOn(false);
  }, []);

  function persist(next: CookieConsent) {
    writeCookieConsent(next);
    setVisible(false);
    setManaging(false);
  }

  function acceptAll() {
    persist({ decided: true, analytics: true });
  }

  function rejectAll() {
    persist({ decided: true, analytics: false });
  }

  function savePreferences() {
    persist({ decided: true, analytics: analyticsOn });
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[100] max-h-[min(85dvh,100%)] overflow-y-auto border-t border-[#2E332E] bg-[#1E2124] pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.35)]"
    >
      <div className="mx-auto flex w-full max-w-[1728px] flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-8 sm:py-6 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-16 lg:py-8 xl:px-[120px]">
        <div className="flex min-w-0 max-w-none flex-col gap-2 lg:max-w-[880px]">
          <p className="font-archivo-narrow text-sm font-bold uppercase leading-snug text-[#FBFAF7] sm:text-base lg:text-lg lg:leading-normal">
            Cookies on The Hedge Collective
          </p>
          <p className="font-eb-garamond text-[15px] font-normal leading-[1.5] text-[#A09C95] sm:text-base lg:text-[17px]">
            We use cookies to give you the best online experience. Strictly
            necessary cookies are{" "}
            <span className="font-bold text-[#FBFAF7]">on</span> by default.
            Additional cookies are{" "}
            <span className="font-bold text-[#FBFAF7]">off</span> by default.
            Accepting additional cookies helps us improve your experience and
            supports our work. For more information, see our{" "}
            <Link
              href="/privacy"
              className="font-bold text-[#C6A02C] underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </p>

          {managing ? (
            <div className="mt-3 flex flex-col gap-3 border border-[#6B665F] bg-[#2E332E]/40 px-3 py-3 sm:mt-4 sm:gap-4 sm:px-4 sm:py-4">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <span className="min-w-0 font-eb-garamond text-sm leading-snug text-[#FBFAF7] sm:text-[15px]">
                  <span className="font-bold">Strictly necessary</span>
                  <span className="mt-1 block text-[#A09C95]">
                    Required for core site functions and security. Always on.
                  </span>
                </span>
                <span className="shrink-0 pt-0.5 font-archivo-narrow text-[10px] font-bold uppercase text-[#C6A02C] sm:text-xs">
                  On
                </span>
              </div>
              <label className="flex cursor-pointer items-start justify-between gap-3 sm:gap-4">
                <span className="min-w-0 font-eb-garamond text-sm leading-snug text-[#FBFAF7] sm:text-[15px]">
                  <span className="font-bold">Analytics</span>
                  <span className="mt-1 block text-[#A09C95]">
                    Helps us understand site use (Google Tag Manager). Off by
                    default.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={analyticsOn}
                  onChange={(e) => setAnalyticsOn(e.target.checked)}
                  className="mt-1 size-4 shrink-0 accent-[#C6A02C] sm:size-[1.125rem]"
                />
              </label>
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:shrink-0 lg:justify-end">
          {managing ? (
            <>
              <button
                type="button"
                onClick={savePreferences}
                className={`${btnBase} bg-[#C6A02C] text-[#111] hover:opacity-90`}
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => {
                  setManaging(false);
                  setAnalyticsOn(
                    readCookieConsent()?.analytics ?? DEFAULT_CONSENT.analytics,
                  );
                }}
                className={`${btnBase} border border-[#6B665F] bg-transparent text-[#A09C95] hover:opacity-80`}
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={acceptAll}
                className={`${btnBase} bg-[#C6A02C] text-[#111] hover:opacity-90`}
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className={`${btnBase} border border-[#6B665F] bg-[#2E332E] text-[#FBFAF7] hover:opacity-90`}
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={() => setManaging(true)}
                className={`${btnBase} border border-[#6B665F] bg-transparent text-[#A09C95] hover:opacity-80`}
              >
                Manage cookies
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
