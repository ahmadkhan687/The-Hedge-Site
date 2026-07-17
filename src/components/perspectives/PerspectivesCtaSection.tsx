import { FadeUp, MotionCTA, WordReveal } from "@/components/ui/text-reveal";

export default function PerspectivesCtaSection() {
  return (
    <section className="bg-[#111] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-24">
      <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-6 text-center">
        <WordReveal
          as="h2"
          className="font-eb-garamond text-[clamp(2.5rem,5vw,64px)] font-medium leading-[1.1] text-white"
          segments={[{ text: "Ready to move forward?" }]}
        />

        <FadeUp
          as="p"
          className="font-inter text-lg font-normal leading-7 text-[#EAEAEA]"
          delay={0.2}
        >
          Request a briefing to discuss your requirements and how we can we can
          help.
        </FadeUp>

        <MotionCTA
          href="/request-access"
          className="inline-flex w-fit items-center gap-2.5 border-b border-white pb-0.5 font-inter text-base font-extrabold uppercase text-white transition-opacity hover:opacity-70"
        >
          Request a briefing
          <span className="font-eb-garamond text-xl font-normal">→</span>
        </MotionCTA>
      </div>
    </section>
  );
}
