import PerspectivesCtaSection from "@/components/perspectives/PerspectivesCtaSection";
import PerspectivesDoctrineSection from "@/components/perspectives/PerspectivesDoctrineSection";
import PerspectivesFullBleedImage from "@/components/perspectives/PerspectivesFullBleedImage";
import PerspectivesHeroSection from "@/components/perspectives/PerspectivesHeroSection";
import PerspectivesQuoteSection from "@/components/perspectives/PerspectivesQuoteSection";
import PerspectivesRecentPiecesSection from "@/components/perspectives/PerspectivesRecentPiecesSection";
import LoopingBackgroundVideo from "@/components/ui/LoopingBackgroundVideo";

export default function PerspectivesPageSection() {
  return (
    <>
      <div className="relative overflow-hidden bg-[#F4F0EA]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <LoopingBackgroundVideo
            src="/perspectives/perspectives-bg-optimized.mp4"
            className="h-full w-full object-cover opacity-[0.39] mix-blend-color-burn"
          />
        </div>

        <div className="relative z-10">
          <PerspectivesHeroSection />
          <PerspectivesDoctrineSection />
        </div>
      </div>

      <PerspectivesFullBleedImage />
      <PerspectivesRecentPiecesSection />
      <PerspectivesQuoteSection />
      <PerspectivesCtaSection />
    </>
  );
}
