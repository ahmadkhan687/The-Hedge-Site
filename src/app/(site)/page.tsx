import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import OperatingModelSection from "@/components/home/OperatingModelSection";

const ThreatSection = dynamic(() => import("@/components/home/ThreatSection"));
const DarkContainerSection = dynamic(
  () => import("@/components/home/DarkContainerSection"),
);
const OurApproachSection = dynamic(
  () => import("@/components/home/OurApproachSection"),
);
const MovingFlowingSection = dynamic(
  () => import("@/components/home/MovingFlowingSection"),
);
const DomainsSection = dynamic(() => import("@/components/home/DomainsSection"));
const SovereigntySection = dynamic(
  () => import("@/components/home/SovereigntySection"),
);
const PerspectiveSection = dynamic(
  () => import("@/components/home/PerspectiveSection"),
);

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <OperatingModelSection />
      <ThreatSection />
      <DarkContainerSection />
      <OurApproachSection />
      <MovingFlowingSection />
      <DomainsSection />
      <SovereigntySection />
      <PerspectiveSection />
    </main>
  );
}
