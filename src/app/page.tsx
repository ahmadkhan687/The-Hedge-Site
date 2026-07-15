import DarkContainerSection from "@/components/home/DarkContainerSection";
import DomainsSection from "@/components/home/DomainsSection";
import HeroSection from "@/components/home/HeroSection";
import MovingFlowingSection from "@/components/home/MovingFlowingSection";
import OperatingModelSection from "@/components/home/OperatingModelSection";
import OurApproachSection from "@/components/home/OurApproachSection";
import PerspectiveSection from "@/components/home/PerspectiveSection";
import SovereigntySection from "@/components/home/SovereigntySection";
import ThreatSection from "@/components/home/ThreatSection";

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
