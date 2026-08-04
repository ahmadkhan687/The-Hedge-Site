"use client";

import dynamic from "next/dynamic";

const HeroGlobe = dynamic(() => import("@/components/home/HeroGlobe"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#F4F0EA]" aria-hidden="true" />
  ),
});

/** Load the live globe as soon as the client chunk is ready — no delayed skeleton. */
export default function HeroGlobeLazy() {
  return <HeroGlobe />;
}
