"use client";

import type { ReactNode } from "react";

type VarroBannerScrollButtonProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

const TARGET_ID = "varro-capability";

/** Smooth-scrolls to the Varro editorial / capability panel below the banner. */
export default function VarroBannerScrollButton({
  children,
  className,
  "aria-label": ariaLabel = "Scroll to capability section",
}: VarroBannerScrollButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      onClick={() => {
        document.getElementById(TARGET_ID)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
    >
      {children}
    </button>
  );
}
