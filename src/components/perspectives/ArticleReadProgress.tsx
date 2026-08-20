"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function computeProgress(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const elementTop = rect.top + window.scrollY;
  const elementHeight = element.offsetHeight;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;

  const start = elementTop;
  const end = elementTop + elementHeight - windowHeight;

  if (elementHeight <= windowHeight) {
    return scrollY >= start ? 100 : 0;
  }
  if (scrollY <= start) return 0;
  if (scrollY >= end) return 100;

  return Math.round(((scrollY - start) / (end - start)) * 100);
}

type ArticleReadProgressProps = {
  children: ReactNode;
};

/** Scroll-based reading progress (0–100%) for the wrapped article content. */
export default function ArticleReadProgress({ children }: ArticleReadProgressProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => {
      const next = computeProgress(el);
      setPercent(next);
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      setVisible(inView && next < 100);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] bg-[#111]/8"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Article reading progress"
      >
        <div
          className="h-full bg-[#C6A02C] transition-[width] duration-150 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div
        aria-hidden={!visible}
        className={`pointer-events-none fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-200 lg:block xl:left-5 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 rounded-full bg-[#F4F0EA]/90 px-3 py-4 shadow-[0_4px_24px_rgba(17,17,17,0.08)] backdrop-blur-sm">
          <span className="font-inter text-[11px] font-extrabold tabular-nums leading-none text-[#111]">
            {percent}%
          </span>
          <div className="relative h-16 w-[3px] overflow-hidden rounded-full bg-[#111]/15">
            <div
              className="absolute bottom-0 left-0 w-full bg-[#C6A02C] transition-[height] duration-150 ease-out"
              style={{ height: `${percent}%` }}
            />
          </div>
          <span className="font-inter text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#6B665F]">
            Read
          </span>
        </div>
      </div>

      <div ref={contentRef} className="flex flex-col gap-8">
        {children}
      </div>
    </>
  );
}
