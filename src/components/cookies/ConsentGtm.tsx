"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import {
  hasAnalyticsConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

type ConsentGtmProps = {
  gtmId: string;
};

/**
 * Loads GTM only after the visitor accepts analytics cookies.
 */
export default function ConsentGtm({ gtmId }: ConsentGtmProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function sync() {
      setEnabled(hasAnalyticsConsent());
    }

    sync();

    function onConsent(e: Event) {
      const detail = (e as CustomEvent<CookieConsent>).detail;
      setEnabled(Boolean(detail?.decided && detail.analytics));
    }

    window.addEventListener("thc:cookie-consent", onConsent);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("thc:cookie-consent", onConsent);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!enabled) return null;
  return <GoogleTagManager gtmId={gtmId} />;
}
