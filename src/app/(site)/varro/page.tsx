import type { Metadata } from "next";
import VarroCtaSection from "@/components/varro/VarroCtaSection";
import VarroEditorialSection from "@/components/varro/VarroEditorialSection";
import VarroFiveMovesSection from "@/components/varro/VarroFiveMovesSection";
import VarroHeroSection from "@/components/varro/VarroHeroSection";
import VarroIntelligenceSection from "@/components/varro/VarroIntelligenceSection";

const title = "Varro | The Hedge Collective";
const description =
  "A passage through the unrecorded tides of the northern straits. Sovereign intelligence, awake when the country sleeps.";
const url = "https://thehedgecollective.co.uk/varro";
const shareImage = "https://thehedgecollective.co.uk/og/share-og.png?v=2";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    type: "website",
    title,
    description,
    url,
    images: [{ url: shareImage }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: shareImage }],
  },
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
