import type { Metadata } from "next";
import SovereigntyPageSection from "@/components/sovereignty/SovereigntyPageSection";

export const metadata: Metadata = {
  title: "Sovereignty | The Hedge Collective",
  description:
    "See. Judge. Own. Sovereign intelligence infrastructure, engineered for those who act with authority.",
};

export default function SovereigntyPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <SovereigntyPageSection />
    </main>
  );
}
