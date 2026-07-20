"use client";

import { Fragment, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

const MotionNextLink = motion.create(Link);

export type TextSegment = {
  text: string;
  className?: string;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.3 } as const;

type RevealTag = "h1" | "h2" | "h3" | "p" | "span";

function containerVariants(stagger: number): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
}

function unitVariants(blur: boolean): Variants {
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
      transition: { duration: 0.7, ease: EASE },
    },
  };
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

  if (reduceMotion) return plainText(segments, Tag, className);

  const variants = unitVariants(false);

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
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

/** Reveals text character by character; optional blur-in on each character. */
export function CharReveal({
  as = "h2",
  className,
  segments,
  blur = false,
}: RevealProps & { blur?: boolean }) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  if (reduceMotion) return plainText(segments, Tag, className);

  const variants = unitVariants(blur);

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants(0.02)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
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

  if (reduceMotion) return plainText(segments, Tag, className);

  const variants: Variants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.5, ease: EASE },
    },
  };

  return (
    <Tag className={className} style={{ perspective: "800px" }}>
      <motion.span
        variants={containerVariants(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Comp = { div: motion.div, p: motion.p, span: motion.span }[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, x: -150 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
  );
}

/** Fade-up entrance for a whole block when it scrolls into view. */
export function FadeUp({
  as = "div",
  className,
  children,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.3,
  spring = false,
}: {
  as?: "div" | "p" | "span" | "article";
  className?: string;
  children: ReactNode;
  delay?: number;
  /** Starting Y offset in px (default 24; capability cards use 150). */
  y?: number;
  /** If false, animation replays each time the element enters view. */
  once?: boolean;
  amount?: number;
  /** Use spring (bounce ~0.2) instead of ease curve. */
  spring?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Plain = as === "article" ? "div" : as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Comp = {
    div: motion.div,
    p: motion.p,
    span: motion.span,
    article: motion.article,
  }[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={
        spring
          ? { type: "spring", duration: 0.7, bounce: 0.08, delay }
          : { duration: 0.85, ease: EASE, delay }
      }
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </Comp>
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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Comp = { div: motion.div, p: motion.p, span: motion.span }[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, x: 150 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Comp = { div: motion.div, p: motion.p, span: motion.span }[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: from }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

const SPRING = { type: "spring", stiffness: 400, damping: 17 } as const;

/** A Next.js Link with hover scale-up and tap press-in. */
export function MotionCTA({
  hoverScale = 1.05,
  tapScale = 0.95,
  children,
  ...props
}: ComponentProps<typeof MotionNextLink> & {
  hoverScale?: number;
  tapScale?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionNextLink
      {...props}
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
