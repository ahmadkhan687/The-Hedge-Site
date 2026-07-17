import Image from "next/image";
import { CharReveal, FadeUp } from "@/components/ui/text-reveal";

export default function DomainsHeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-5 py-24 sm:px-8 lg:px-[120px] lg:py-[160px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/Domains/Hero.webp"
          alt=""
          fill
          className="object-cover object-bottom opacity-60"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 flex max-w-[851px] flex-col items-center gap-8 text-center">
        <p className="font-barlow-condensed text-base font-extrabold uppercase leading-normal text-[#C6A02C]">
          Live today across continents
        </p>

        <CharReveal
          as="h1"
          blur
          className="font-eb-garamond text-[clamp(3rem,10vw,144px)] font-medium leading-[0.9] text-[#111]"
          segments={[{ text: "Three threats. Every scale." }]}
        />

        <FadeUp
          as="p"
          className="font-inter text-lg font-normal leading-[1.6] text-[#6B665F] sm:text-[22px]"
          delay={0.3}
        >
          From a single actor to a hostile state running a continent. The same
          mind catches both, names the hand behind it, and gives you the move. A
          redacted case sits with each.
        </FadeUp>
      </div>
    </section>
  );
}
