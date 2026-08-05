"use client";

import {
  Fragment,
  useRef,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { trackEvent } from "@/lib/gtm";

const MotionNextLink = motion.create(Link);

export type TextSegment = {
  text: string;
  className?: string;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Fire well before the section is on screen; catch-up snaps if already mid-viewport. */
const VIEWPORT = {
  once: true,
  amount: 0.05,
  margin: "0px 0px 55% 0px",
} as const;

type RevealTag = "h1" | "h2" | "h3" | "p" | "span";

function containerVariants(stagger: number): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
}

function unitVariants(duration: number, blur = false): Variants {
  return {
    hidden: {
      opacity: 0,
      y: "0.28em",
      ...(blur ? { filter: "blur(6px)" } : {}),
    },
    visible: {
      opacity: 1,
      y: 0,
      ...(blur ? { filter: "blur(0px)" } : {}),
      transition: { duration, ease: EASE },
    },
  };
}

/** True when element is already well into the viewport (fast-scroll catch-up). */
function shouldSnapIn(el: Element | null): boolean {
  if (!el || typeof window === "undefined") return false;
  return el.getBoundingClientRect().top < window.innerHeight * 0.55;
}

function plainText(segments: TextSegment[], Tag: RevealTag, className?: string) {
  return (
    <Tag className={className}>
      {segments.map((seg, si) => (
        <span key={si} className={seg.className}>
          {seg.text.split("\n").map((line, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}

function renderWords(text: string, variants: Variants) {
  return text.split("\n").map((line, li) => (
    <Fragment key={li}>
      {li > 0 && <br />}
      {line.split(/(\s+)/).map((part, pi) => {
        if (part === "") return null;
        if (/^\s+$/.test(part)) return <Fragment key={pi}>{part}</Fragment>;
        return (
          <motion.span
            key={pi}
            variants={variants}
            className="inline-block will-change-transform"
          >
            {part}
          </motion.span>
        );
      })}
    </Fragment>
  ));
}

function renderChars(text: string, variants: Variants) {
  return text.split("\n").map((line, li) => (
    <Fragment key={li}>
      {li > 0 && <br />}
      {line.split(/(\s+)/).map((part, pi) => {
        if (part === "") return null;
        if (/^\s+$/.test(part)) return <Fragment key={pi}>{part}</Fragment>;
        return (
          <span key={pi} className="inline-block whitespace-nowrap">
            {Array.from(part).map((char, ci) => (
              <motion.span
                key={ci}
                variants={variants}
                className="inline-block will-change-transform"
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </Fragment>
  ));
}

type RevealProps = {
  as?: RevealTag;
  className?: string;
  segments: TextSegment[];
};

/** Reveals text word by word: staggered fade-in with slight upward movement. */
export function WordReveal({ as = "h2", className, segments }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, VIEWPORT);

  if (reduceMotion) return plainText(segments, Tag, className);

  const snap = inView && shouldSnapIn(ref.current);
  const variants = unitVariants(snap ? 0.15 : 0.4);

  return (
    <Tag ref={ref as never} className={className}>
      <motion.span
        variants={containerVariants(snap ? 0 : 0.03)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {segments.map((seg, si) => (
          <span key={si} className={seg.className}>
            {renderWords(seg.text, variants)}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/**
 * Character reveal — hero-only. Prefer WordReveal below the fold.
 * Blur is ignored (too expensive on scroll); uses transform/opacity only.
 */
export function CharReveal({
  as = "h2",
  className,
  segments,
  blur: _blur = false,
}: RevealProps & { blur?: boolean }) {
  const reduceMotion = useReducedMotion();
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, VIEWPORT);

  if (reduceMotion) return plainText(segments, Tag, className);

  const snap = inView && shouldSnapIn(ref.current);
  const variants = unitVariants(snap ? 0.12 : 0.35, false);

  return (
    <Tag ref={ref as never} className={className}>
      <motion.span
        variants={containerVariants(snap ? 0 : 0.012)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {segments.map((seg, si) => (
          <span key={si} className={seg.className}>
            {renderChars(seg.text, variants)}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Reveals text character by character with a 3D Y-axis rotation. Use for one dramatic line per page. */
export function Char3DReveal({ as = "h2", className, segments }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, VIEWPORT);

  if (reduceMotion) return plainText(segments, Tag, className);

  const snap = inView && shouldSnapIn(ref.current);
  const variants: Variants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { duration: snap ? 0.12 : 0.35, ease: EASE },
    },
  };

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ perspective: "800px" }}
    >
      <motion.span
        variants={containerVariants(snap ? 0 : 0.03)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {segments.map((seg, si) => (
          <span key={si} className={seg.className}>
            {renderChars(seg.text, variants)}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

function BlockReveal({
  as = "div",
  className,
  children,
  delay = 0,
  from,
}: {
  as?: "div" | "p" | "span" | "article";
  className?: string;
  children: ReactNode;
  delay?: number;
  from: { opacity?: number; x?: number; y?: number; scale?: number };
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, VIEWPORT);

  if (reduceMotion) {
    const Plain = (as === "article" ? "div" : as) as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  const snap = inView && shouldSnapIn(ref.current);
  const Comp = {
    div: motion.div,
    p: motion.p,
    span: motion.span,
    article: motion.article,
  }[as];

  return (
    <Comp
      ref={ref as never}
      className={className}
      initial={from}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                duration: snap ? 0.15 : 0.4,
                ease: EASE,
                delay: snap ? 0 : delay,
              },
            }
          : from
      }
    >
      {children}
    </Comp>
  );
}

/** Slides a block in from the left when it scrolls into view. */
export function SlideInLeft({
  as = "div",
  className,
  children,
  delay = 0,
}: {
  as?: "div" | "p" | "span";
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <BlockReveal
      as={as}
      className={className}
      delay={delay}
      from={{ opacity: 0, x: -80 }}
    >
      {children}
    </BlockReveal>
  );
}

/** Fade-up entrance for a whole block when it scrolls into view. */
export function FadeUp({
  as = "div",
  className,
  children,
  delay = 0,
  y = 24,
  once: _once = true,
  amount: _amount = 0.05,
  spring: _spring = false,
}: {
  as?: "div" | "p" | "span" | "article";
  className?: string;
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  spring?: boolean;
}) {
  return (
    <BlockReveal
      as={as}
      className={className}
      delay={delay}
      from={{ opacity: 0, y }}
    >
      {children}
    </BlockReveal>
  );
}

/** Scales its content slightly on hover. */
export function HoverScale({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

/** Softly shrinks content on hover (frame/card items). */
export function HoverShrink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 0.985 }}
      transition={{ duration: 0.45, ease: EASE }}
      style={{ transformOrigin: "center top" }}
    >
      {children}
    </motion.div>
  );
}

/** Slides a block in from the right when it scrolls into view. */
export function SlideInRight({
  as = "div",
  className,
  children,
  delay = 0,
}: {
  as?: "div" | "p" | "span";
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <BlockReveal
      as={as}
      className={className}
      delay={delay}
      from={{ opacity: 0, x: 80 }}
    >
      {children}
    </BlockReveal>
  );
}

/** Subtle fade-in (no movement) on scroll into view. */
export function FadeIn({
  as = "div",
  className,
  children,
  delay = 0,
}: {
  as?: "div" | "p" | "span";
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <BlockReveal
      as={as}
      className={className}
      delay={delay}
      from={{ opacity: 0 }}
    >
      {children}
    </BlockReveal>
  );
}

/** Fades and scales a media/image block up from a smaller size on scroll into view. */
export function ScaleFadeIn({
  className,
  children,
  delay = 0,
  from = 0.8,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
  from?: number;
}) {
  return (
    <BlockReveal
      as="div"
      className={className}
      delay={delay}
      from={{ opacity: 0, scale: from }}
    >
      {children}
    </BlockReveal>
  );
}

const SPRING = { type: "spring", stiffness: 400, damping: 17 } as const;

/** A Next.js Link with hover scale-up and tap press-in. */
export function MotionCTA({
  hoverScale = 1.05,
  tapScale = 0.95,
  analyticsEvent,
  onClick,
  children,
  ...props
}: ComponentProps<typeof MotionNextLink> & {
  hoverScale?: number;
  tapScale?: number;
  /** Optional GTM event name fired on click. */
  analyticsEvent?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionNextLink
      {...props}
      onClick={(e) => {
        if (analyticsEvent) {
          trackEvent(analyticsEvent);
        }
        onClick?.(e);
      }}
      whileHover={reduceMotion ? undefined : { scale: hoverScale }}
      whileTap={reduceMotion ? undefined : { scale: tapScale }}
      transition={SPRING}
    >
      {children}
    </MotionNextLink>
  );
}

/** A native button with hover scale-up and tap press-in. */
export function MotionButton({
  hoverScale = 1.05,
  tapScale = 0.95,
  children,
  ...props
}: ComponentProps<typeof motion.button> & {
  hoverScale?: number;
  tapScale?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      {...props}
      whileHover={reduceMotion ? undefined : { scale: hoverScale }}
      whileTap={reduceMotion ? undefined : { scale: tapScale }}
      transition={SPRING}
    >
      {children}
    </motion.button>
  );
}
