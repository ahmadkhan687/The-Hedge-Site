import { FadeUp, MotionCTA, WordReveal } from "@/components/ui/text-reveal";

export default function SovereigntyCtaSection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:py-24">
      <div className="mx-auto flex w-full max-w-[1140px] flex-col gap-6">
        <WordReveal
          as="h2"
          className="font-eb-garamond text-[clamp(2.5rem,5vw,64px)] font-medium leading-[1.1] text-[#111]"
          segments={[{ text: "It's time to act." }]}
        />

        <FadeUp
          as="p"
          className="font-inter text-base font-normal leading-[1.65] text-[#6B665F] lg:text-lg lg:leading-7"
          delay={0.2}
        >
          Request a briefing to discuss your requirements and how we can help.
        </FadeUp>

        <MotionCTA
          href="/request-access"
          tapScale={0.95}
          className="flex w-full items-center gap-2.5 border border-[#111] px-5 py-4 font-inter text-sm font-extrabold uppercase text-[#111] no-underline transition-opacity hover:opacity-70 lg:hidden"
        >
          Request a briefing
          <span className="font-inter text-lg font-normal">→</span>
        </MotionCTA>

        <MotionCTA
          href="/request-access"
          className="hidden w-fit items-center gap-2.5 border-b border-[#111] pb-0.5 font-inter text-base font-extrabold uppercase text-[#111] no-underline transition-opacity hover:opacity-70 lg:inline-flex"
        >
          Request a briefing
          <span className="font-eb-garamond text-xl font-normal">→</span>
        </MotionCTA>
      </div>
    </section>
  );
}
