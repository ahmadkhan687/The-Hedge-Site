"use client";

import { useEffect, useRef, useState } from "react";
import DottedGlobe, {
  type GlobePulseMarker,
} from "@/components/ui/dotted-globe";

const REFRESH_MS = 360_000; // 6 minutes
const NEW_HIGHLIGHT_MS = 90_000; // clear "new" after 90s even before next refresh

type PulseWithMeta = GlobePulseMarker & { isNew?: boolean };

export default function HeroGlobe() {
  const [mounted, setMounted] = useState(false);
  const [pulses, setPulses] = useState<PulseWithMeta[] | null>(null);
  const prevIdsRef = useRef<Set<string>>(new Set());
  const isFirstLoadRef = useRef(true);
  const highlightTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let inFlight = false;

    async function load() {
      if (inFlight) return;
      inFlight = true;
      try {
        const res = await fetch("/api/signals-feed", { cache: "no-store" });
        if (cancelled || !res.ok) return;

        const data = (await res.json()) as { pulses?: GlobePulseMarker[] };
        if (cancelled) return;

        const incoming = Array.isArray(data.pulses)
          ? data.pulses.slice(0, 50)
          : [];

        if (incoming.length === 0) {
          // Keep previous pulses on empty payload
          return;
        }

        const prevIds = prevIdsRef.current;
        const isFirst = isFirstLoadRef.current;

        const next: PulseWithMeta[] = incoming.map((pulse) => ({
          ...pulse,
          isNew: !isFirst && !prevIds.has(pulse.id),
        }));

        prevIdsRef.current = new Set(incoming.map((p) => p.id));
        isFirstLoadRef.current = false;
        setPulses(next);

        if (highlightTimerRef.current) {
          window.clearTimeout(highlightTimerRef.current);
        }
        const hasNew = next.some((p) => p.isNew);
        if (hasNew) {
          highlightTimerRef.current = window.setTimeout(() => {
            if (cancelled) return;
            setPulses((current) =>
              current
                ? current.map((p) => (p.isNew ? { ...p, isNew: false } : p))
                : current,
            );
          }, NEW_HIGHLIGHT_MS);
        }
      } catch {
        // Silent — keep existing globe markers; never surface internals
      } finally {
        inFlight = false;
      }
    }

    void load();
    const id = window.setInterval(() => {
      void load();
    }, REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(id);
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0" aria-hidden="true" />;
  }

  return <DottedGlobe className="absolute inset-0" pulses={pulses} />;
}
