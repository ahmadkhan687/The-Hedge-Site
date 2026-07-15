import type { Metadata } from "next";
import AboutSection from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About | The Hedge Collective",
  description:
    "We build sovereign intelligence. Owned by the state that uses it. Institutional-grade infrastructure designed for strategic independence.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <AboutSection />
    </main>
  );
}
