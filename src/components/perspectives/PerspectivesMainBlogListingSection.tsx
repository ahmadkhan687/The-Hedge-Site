"use client";

import PerspectivesBlogClient from "@/components/perspectives/PerspectivesBlogClient";

/** Renders layout immediately; client fetches articles and shows skeleton until ready. */
export default function PerspectivesMainBlogListingSection() {
  return <PerspectivesBlogClient />;
}
