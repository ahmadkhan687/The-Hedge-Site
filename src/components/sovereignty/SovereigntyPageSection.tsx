import SovereigntyCapabilitySection from "@/components/sovereignty/SovereigntyCapabilitySection";
import SovereigntyCtaSection from "@/components/sovereignty/SovereigntyCtaSection";
import SovereigntyHeroSection from "@/components/sovereignty/SovereigntyHeroSection";
import SovereigntyJurisdictionSection from "@/components/sovereignty/SovereigntyJurisdictionSection";
import SovereigntyNoLockInSection from "@/components/sovereignty/SovereigntyNoLockInSection";

export default function SovereigntyPageSection() {
  return (
    <>
      <SovereigntyHeroSection />
      <SovereigntyJurisdictionSection />
      <SovereigntyCapabilitySection />
      <SovereigntyNoLockInSection />
      <SovereigntyCtaSection />
    </>
  );
}
