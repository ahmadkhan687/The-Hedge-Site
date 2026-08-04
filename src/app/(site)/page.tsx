import HeroSection from "@/components/home/HeroSection";
import OperatingModelSection from "@/components/home/OperatingModelSection";
import ThreatSection from "@/components/home/ThreatSection";
import DarkContainerSection from "@/components/home/DarkContainerSection";
import OurApproachSection from "@/components/home/OurApproachSection";
import MovingFlowingSection from "@/components/home/MovingFlowingSection";
import DomainsSection from "@/components/home/DomainsSection";
import SovereigntySection from "@/components/home/SovereigntySection";
import PerspectiveSection from "@/components/home/PerspectiveSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <div className="scroll-section">
        <OperatingModelSection />
      </div>
      <div className="scroll-section">
        <ThreatSection />
      </div>
      <div className="scroll-section">
        <DarkContainerSection />
      </div>
      <div className="scroll-section">
        <OurApproachSection />
      </div>
      <div className="scroll-section">
        <MovingFlowingSection />
      </div>
      <div className="scroll-section">
        <DomainsSection />
      </div>
      <div className="scroll-section">
        <SovereigntySection />
      </div>
      <div className="scroll-section">
        <PerspectiveSection />
      </div>
    </main>
  );
}
