import type { Metadata } from "next";
import VarroCtaSection from "@/components/varro/VarroCtaSection";
import VarroEditorialSection from "@/components/varro/VarroEditorialSection";
import VarroFiveMovesSection from "@/components/varro/VarroFiveMovesSection";
import VarroHeroSection from "@/components/varro/VarroHeroSection";
import VarroIntelligenceSection from "@/components/varro/VarroIntelligenceSection";

export const metadata: Metadata = {
  title: "Varro | The Hedge Collective",
  description:
    "A passage through the unrecorded tides of the northern straits. Sovereign intelligence, awake when the country sleeps.",
};

export default function VarroPage() {
  return (
    <main className="flex-1 bg-[#F5F0E8]">
      <VarroHeroSection />
      <VarroIntelligenceSection />
      <VarroEditorialSection />
      <VarroFiveMovesSection />
      <VarroCtaSection />
    </main>
  );
}
