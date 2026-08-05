"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { trackEvent } from "@/lib/gtm";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: string;
  eventParams?: Record<string, unknown>;
};

/**
 * Next.js Link that pushes a GTM event on click without changing navigation.
 */
export function TrackedLink({
  event,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    trackEvent(event, eventParams);
    onClick?.(e);
  }

  return <Link {...props} onClick={handleClick} />;
}
