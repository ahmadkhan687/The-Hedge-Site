import AboutCtaSection from "@/components/about/AboutCtaSection";
import AboutDiagramImage from "@/components/about/AboutDiagramImage";
import AboutDisciplineSection from "@/components/about/AboutDisciplineSection";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutStrategicIntentSection from "@/components/about/AboutStrategicIntentSection";
import AboutTrustSection from "@/components/about/AboutTrustSection";

export default function AboutSection() {
  return (
    <>
      <AboutHeroSection />
      <AboutDiagramImage />
      <AboutDisciplineSection />
      <AboutStrategicIntentSection />
      <AboutTrustSection />
      <AboutCtaSection />
    </>
  );
}
