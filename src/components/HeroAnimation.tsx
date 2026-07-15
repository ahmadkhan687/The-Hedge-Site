"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

import { cn } from "@/lib/utils";

/* ─── Placeholder data (swap with real copy later) ─── */

const STAT_CARDS = [
  {
    id: "stat-a",
    label: "Metric A",
    value: 1284,
    suffix: "",
    detail: "Placeholder stat",
    depth: 0.6,
    floatDelay: 0,
    className:
      "left-[4%] top-[8%] w-[180px] sm:w-[200px] lg:left-[6%] lg:top-[10%] lg:w-[220px]",
  },
  {
    id: "stat-b",
    label: "Metric B",
    value: 96,
    suffix: "%",
    detail: "Placeholder rate",
    depth: 0.85,
    floatDelay: 0.6,
    className:
      "right-[4%] top-[14%] w-[170px] sm:w-[190px] lg:right-[8%] lg:top-[12%] lg:w-[210px]",
  },
  {
    id: "stat-c",
    label: "Metric C",
    value: 42,
    suffix: "ms",
    detail: "Placeholder latency",
    depth: 0.45,
    floatDelay: 1.2,
    className:
      "bottom-[18%] left-[8%] w-[165px] sm:w-[185px] lg:bottom-[16%] lg:left-[10%] lg:w-[200px]",
  },
] as const;

const CHART_BARS = [38, 62, 45, 78, 55, 88, 70, 92, 64, 84];
const CHART_LINE = "M4 52 L28 38 L52 44 L76 22 L100 30 L124 14 L148 26 L172 8";

/* ─── Variants ─── */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ─── Count-up (motion values, no React state on tick) ─── */

function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [duration, motionValue, value]);

  useEffect(() => {
    return motionValue.on("change", (latest) => {
      if (spanRef.current) {
        spanRef.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
  }, [motionValue, suffix]);

  return (
    <span ref={spanRef} className={className}>
      0{suffix}
    </span>
  );
}

/* ─── Mini charts ─── */

function MiniBarChart({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-16 items-end gap-1.5", className)}>
      {CHART_BARS.map((height, index) => (
        <motion.div
          key={index}
          className="w-2 rounded-sm bg-gradient-to-t from-violet-500/80 to-blue-400/90"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            delay: 0.55 + index * 0.06,
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            height: `${height}%`,
            originY: 1,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

function MiniLineChart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 176 60"
      className={cn("h-14 w-full", className)}
      aria-hidden
    >
      <motion.path
        d={CHART_LINE}
        fill="none"
        stroke="url(#hero-line-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.65, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "stroke-dashoffset, opacity" }}
      />
      <defs>
        <linearGradient id="hero-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Glass card shell ─── */

function GlassCard({
  children,
  className,
  depth = 1,
  floatDelay = 0,
  parallaxX,
  parallaxY,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  floatDelay?: number;
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(parallaxX, (value) => value * depth);
  const y = useTransform(parallaxY, (value) => value * depth);
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  return (
    <motion.div
      variants={cardEntranceVariants}
      className={cn(
        "absolute rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-5",
        "will-change-transform",
        className,
      )}
      style={{ transform }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─── Background orbs ─── */

function GlowOrb({
  className,
  drift,
  duration,
  depth,
  parallaxX,
  parallaxY,
}: {
  className: string;
  drift: { x: number[]; y: number[] };
  duration: number;
  depth: number;
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(parallaxX, (value) => value * depth);
  const y = useTransform(parallaxY, (value) => value * depth);

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        className,
      )}
      style={{
        x,
        y,
        willChange: "transform",
      }}
      animate={drift}
      transition={{
        repeat: Infinity,
        duration,
        ease: "easeInOut",
      }}
    />
  );
}

function GlowOrbs({
  parallaxX,
  parallaxY,
}: {
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
}) {
  return (
    <>
      <GlowOrb
        className="left-[-10%] top-[8%] h-72 w-72 bg-violet-600/35 sm:h-96 sm:w-96"
        drift={{ x: [0, 36, 0], y: [0, -24, 0] }}
        duration={14}
        depth={-0.35}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />
      <GlowOrb
        className="right-[-8%] top-[20%] h-64 w-64 bg-blue-500/30 sm:h-80 sm:w-80"
        drift={{ x: [0, -28, 0], y: [0, 18, 0] }}
        duration={16}
        depth={-0.25}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />
      <GlowOrb
        className="bottom-[6%] left-[28%] h-56 w-56 bg-indigo-500/25 sm:h-72 sm:w-72"
        drift={{ x: [0, 22, 0], y: [0, -16, 0] }}
        duration={18}
        depth={-0.2}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />
    </>
  );
}

/* ─── Main component ─── */

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 60, damping: 22, mass: 0.6 });
  const parallaxY = useSpring(pointerY, { stiffness: 60, damping: 22, mass: 0.6 });

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const narrowViewport = window.matchMedia("(max-width: 767px)").matches;
    setParallaxEnabled(!coarsePointer && !narrowViewport);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!parallaxEnabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(normalizedX * 14);
    pointerY.set(normalizedY * 10);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[520px] w-full overflow-hidden bg-[#0a0a0f] sm:min-h-[620px] lg:min-h-[720px]"
      aria-label="Hero animation preview"
    >
      <GlowOrbs parallaxX={parallaxX} parallaxY={parallaxY} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(88,28,135,0.18),transparent_55%)]" />

      <motion.div
        className="relative mx-auto h-full min-h-[inherit] w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Center headline placeholder */}
        <motion.div
          variants={cardEntranceVariants}
          className="relative z-10 mx-auto max-w-xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/80 sm:text-sm">
            Placeholder label
          </p>
          <h2 className="mt-3 font-eb-garamond text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
            Dashboard preview
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            Animated glass cards assemble into a live interface preview. Replace
            this copy with your hero content.
          </p>
        </motion.div>

        {/* Desktop / tablet: absolute dashboard layout */}
        <div className="relative mt-10 hidden min-h-[380px] md:block lg:mt-12 lg:min-h-[420px]">
          {STAT_CARDS.map((card) => (
            <GlassCard
              key={card.id}
              className={card.className}
              depth={card.depth}
              floatDelay={card.floatDelay}
              parallaxX={parallaxX}
              parallaxY={parallaxY}
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/45 sm:text-xs">
                {card.label}
              </p>
              <CountUp
                value={card.value}
                suffix={card.suffix}
                className="mt-1 block text-2xl font-semibold tabular-nums text-white sm:text-3xl"
              />
              <p className="mt-1 text-xs text-white/40">{card.detail}</p>
            </GlassCard>
          ))}

          <GlassCard
            className="left-[28%] top-[22%] w-[240px] sm:w-[260px] lg:left-[30%] lg:top-[24%] lg:w-[300px]"
            depth={0.7}
            floatDelay={0.3}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/45 sm:text-xs">
              Chart A
            </p>
            <MiniBarChart className="mt-3" />
            <p className="mt-2 text-xs text-white/40">Placeholder bar chart</p>
          </GlassCard>

          <GlassCard
            className="right-[6%] bottom-[14%] w-[220px] sm:w-[250px] lg:right-[10%] lg:bottom-[12%] lg:w-[280px]"
            depth={0.55}
            floatDelay={0.9}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/45 sm:text-xs">
              Chart B
            </p>
            <MiniLineChart className="mt-3" />
            <p className="mt-2 text-xs text-white/40">Placeholder line chart</p>
          </GlassCard>

          <GlassCard
            className="left-[42%] top-[52%] w-[150px] lg:w-[170px]"
            depth={0.95}
            floatDelay={1.5}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path d="M12 3v18M3 12h18" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-white/80">Status</p>
                <p className="text-[10px] text-emerald-400/90">Placeholder</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Mobile: simplified stacked cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {STAT_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardEntranceVariants}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
              >
                <p className="text-xs uppercase tracking-wider text-white/45">
                  {card.label}
                </p>
                <CountUp
                  value={card.value}
                  suffix={card.suffix}
                  className="mt-1 block text-2xl font-semibold text-white"
                />
              </motion.div>
            </motion.div>
          ))}

          <motion.div
            variants={cardEntranceVariants}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl sm:col-span-2"
          >
            <p className="text-xs uppercase tracking-wider text-white/45">
              Chart A
            </p>
            <MiniBarChart className="mt-3 h-12" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
