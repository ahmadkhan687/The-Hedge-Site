import Image from "next/image";
import { FadeUp, WordReveal } from "@/components/ui/text-reveal";

export default function VarroHeroSection() {
  return (
    <>
      {/* —— Mobile: chapter + image —— */}
      <section className="bg-[#F5F0E8] lg:hidden">
        <div className="flex flex-col px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
          <p className="font-schibsted-grotesk text-xs font-semibold uppercase leading-normal tracking-[0.06em] text-[#A38F75]">
            Chapter
          </p>

          <div className="mt-3 flex w-full flex-col items-center text-center">
            <WordReveal
              as="h1"
              className="font-eb-garamond text-[clamp(4.5rem,22vw,6.5rem)] font-normal leading-[0.85] tracking-normal text-[#2C2A26]"
              segments={[{ text: "Varro" }]}
            />

            <FadeUp
              as="p"
              className="mt-4 max-w-[320px] font-inter text-base font-normal leading-[1.5] text-[#4A4844]/80"
              delay={0.3}
            >
              A passage through the unrecorded tides of the northern straits.
            </FadeUp>
          </div>
        </div>

        <div className="h-8 w-full bg-[#F5F0E8]" aria-hidden="true" />
        <div className="h-px w-full bg-[#D9D7D2]" />

        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src="/Varro/Hero1.webp"
            alt="Varro command console with multi-screen intelligence displays"
            fill
            className="object-cover object-[center_42%]"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* —— Desktop: intro —— */}
      <section className="hidden flex-col items-center bg-[#F5F0E8] px-20 pt-[140px] lg:flex lg:gap-[56px]">
        <div className="flex w-full max-w-[647px] flex-col items-center gap-4 text-center">
          <p className="font-schibsted-grotesk text-base font-semibold uppercase leading-normal text-[#A38F75]">
            Chapter
          </p>

          <WordReveal
            as="h1"
            className="font-eb-garamond text-[clamp(4.5rem,22vw,220px)] font-normal leading-[80%] tracking-normal text-[#2C2A26]"
            segments={[{ text: "Varro" }]}
          />

          <FadeUp
            as="p"
            className="font-inter text-[clamp(1.125rem,2.5vw,24px)] font-normal leading-normal text-[#4A4844]/80"
            delay={0.3}
          >
            A passage through the unrecorded tides of the northern straits.
          </FadeUp>
        </div>
      </section>

      {/* —— Mobile: mission + faculty box —— */}
      <section className="bg-[#F5F0E8] px-5 pb-10 pt-10 sm:px-8 lg:hidden">
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-5 text-center">
          <p className="font-schibsted-grotesk text-[10px] font-semibold uppercase leading-normal tracking-[0.08em] text-[#A38F75]">
            Mission designation: Varro Collection
          </p>

          <WordReveal
            as="h2"
            className="font-eb-garamond text-[clamp(2.5rem,12vw,3.5rem)] font-normal leading-[0.9] text-[#2C2A26]"
            segments={[{ text: "A NATION'S\nOWN EYES." }]}
          />

          <FadeUp
            as="p"
            className="font-inter text-base font-normal leading-normal text-[#4A4844]/80"
            delay={0.2}
          >
            Awake when the country sleeps.
          </FadeUp>

          <div className="mt-4 h-px w-16 bg-[#D9D7D2]" />
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-[900px] flex-col gap-3 border border-[#2C2A26] p-5">
          <p className="font-eb-garamond text-sm font-bold uppercase leading-normal text-[#2C2A26]">
            Faculty
          </p>
          <div className="h-px w-8 bg-[#2C2A26]/25" />
          <p className="font-eb-garamond text-base font-normal leading-[1.35] text-[#4A4844]">
            Sovereign intelligence
          </p>
        </div>
      </section>

      {/* —— Desktop: mission copy —— */}
      <section className="hidden flex-col items-center bg-[#F5F0E8] pb-[19px] pt-[53px] lg:flex lg:gap-16 lg:px-20">
        <div className="flex w-full max-w-[1568px] flex-col items-center gap-[62px]">
          <div className="relative aspect-[1568/470] w-full overflow-hidden rounded-xl">
            <Image
              src="/Varro/Hero1.webp"
              alt="Varro command console with multi-screen intelligence displays"
              fill
              className="object-cover object-[center_42%]"
              priority
              sizes="(max-width: 1568px) 100vw, 1568px"
            />
          </div>

          <div className="flex max-w-[900px] flex-col items-center gap-[35px] text-center">
            <p className="font-schibsted-grotesk text-xs font-semibold uppercase leading-normal tracking-[0.04em] text-[#A38F75]">
              Mission designation: Varro Collection
            </p>

            <WordReveal
              as="h2"
              className="font-eb-garamond text-[clamp(2.25rem,11vw,113px)] font-normal leading-[85%] text-[#2C2A26]"
              segments={[{ text: "A NATION'S OWN EYES." }]}
            />

            <FadeUp
              as="p"
              className="max-w-[322px] font-inter text-xl font-normal leading-normal text-[#4A4844]/80"
              delay={0.2}
            >
              Awake when the country sleeps.
            </FadeUp>
          </div>
        </div>

        <div className="mt-8 h-px w-full max-w-[405px] bg-[#D9D7D2]" />
      </section>
    </>
  );
}
