"use client";

import { useEffect, useState } from "react";

export const DOMAINS_SECTIONS = [
  { id: "domains-hero", label: "Hero" },
  { id: "domains-threat-synthetic", label: "Synthetic Narrative Warfare" },
  { id: "domains-editorial", label: "Editorial" },
  { id: "domains-threat-networks", label: "Coordinated Networks" },
  { id: "domains-precision", label: "Precision" },
  { id: "domains-threat-radicalisation", label: "Engineered Radicalisation" },
  { id: "domains-scale", label: "Scale" },
  { id: "domains-method", label: "Method" },
  { id: "domains-closing", label: "Closing" },
] as const;

/** Fixed vertical line rail — one line per Domains section; active line thickens in gold. */
export default function DomainsSectionIndicator() {
  const [activeId, setActiveId] = useState<string>(DOMAINS_SECTIONS[0].id);

  useEffect(() => {
    const elements = DOMAINS_SECTIONS.map((s) =>
      document.getElementById(s.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const pickActive = () => {
      let bestId: (typeof DOMAINS_SECTIONS)[number]["id"] =
        DOMAINS_SECTIONS[0].id;
      let bestRatio = -1;
      for (const section of DOMAINS_SECTIONS) {
        const ratio = ratios.get(section.id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = section.id;
        }
      }
      if (bestRatio > 0) {
        setActiveId(bestId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        pickActive();
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveId(id);
  };

  return (
    <nav
      aria-label="Domains page sections"
      className="pointer-events-none fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:left-5"
    >
      <ul className="pointer-events-auto flex flex-col items-start gap-3 rounded-full bg-[#F4F0EA]/85 px-2.5 py-4 shadow-[0_4px_24px_rgba(17,17,17,0.08)] backdrop-blur-sm">
        {DOMAINS_SECTIONS.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollTo(section.id)}
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center justify-start py-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A02C]"
              >
                <span
                  aria-hidden="true"
                  className={`block transition-all duration-300 ease-out ${
                    isActive
                      ? "h-[3px] w-7 bg-[#C6A02C]"
                      : "h-px w-4 bg-[#111]/35 group-hover:w-5 group-hover:bg-[#111]/55"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
