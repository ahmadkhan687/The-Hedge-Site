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
