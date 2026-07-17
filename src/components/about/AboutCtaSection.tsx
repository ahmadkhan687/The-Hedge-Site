import { FadeUp, MotionCTA, WordReveal } from "@/components/ui/text-reveal";

export default function AboutCtaSection() {
  return (
    <section className="flex flex-col items-center gap-10 bg-[#111] px-5 py-20 sm:px-8 lg:px-[120px] lg:py-40">
      <div className="flex max-w-[900px] flex-col items-center gap-6 text-center">
        <WordReveal
          as="h2"
          className="font-eb-garamond text-[clamp(2.5rem,6vw,72px)] font-medium leading-normal text-white"
          segments={[{ text: "Don't wait for a breach." }]}
        />

        <FadeUp
          as="p"
          className="max-w-[700px] font-eb-garamond text-xl font-normal text-[#EAEAEA]"
          delay={0.2}
        >
          The threat doesn&apos;t wait, neither should you. Reach out now and take
          control.
        </FadeUp>
      </div>

      <MotionCTA
        href="/request-access"
        hoverScale={1.05}
        tapScale={0.95}
        className="inline-flex items-center justify-center bg-[#C6A02C] px-12 py-5 font-inter text-sm font-bold uppercase text-[#111] transition-opacity hover:opacity-85"
      >
        Book a consultation
      </MotionCTA>
    </section>
  );
}
