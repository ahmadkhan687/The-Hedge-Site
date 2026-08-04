"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroGlobe = dynamic(() => import("@/components/home/HeroGlobe"), {
  ssr: false,
  loading: () => <GlobePlaceholder />,
});

function GlobePlaceholder() {
  return (
    <div className="absolute inset-0 bg-[#F4F0EA]" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#111]/08 bg-[#F4F0EA]"
        style={{
          boxShadow: "inset 0 0 60px rgba(17,17,17,0.04)",
        }}
      />
    </div>
  );
}

/**
 * Desktop: load globe soon after mount.
 * Mobile: defer canvas + feed until idle / interaction so LCP & TBT stay green.
 */
export default function HeroGlobeLazy() {
  const [loadGlobe, setLoadGlobe] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const enable = () => {
      if (cancelled) return;
      setLoadGlobe(true);
    };

    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) {
      // Desktop — slight delay so first paint/LCP can settle
      timeoutId = window.setTimeout(enable, 200);
      return () => {
        cancelled = true;
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }

    const onInteract = () => enable();
    window.addEventListener("pointerdown", onInteract, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchstart", onInteract, {
      once: true,
      passive: true,
    });
    window.addEventListener("scroll", onInteract, { once: true, passive: true });

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(enable, { timeout: 4500 });
    } else {
      timeoutId = window.setTimeout(enable, 2800);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!loadGlobe) {
    return <GlobePlaceholder />;
  }

  return <HeroGlobe />;
}
