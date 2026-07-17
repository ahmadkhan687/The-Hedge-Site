import Image from "next/image";
import { CharReveal, FadeUp } from "@/components/ui/text-reveal";

export default function RequestAccessHeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/Request%20a%20briefing/Hero.png"
        alt=""
        width={1873}
        height={922}
        className="block h-auto w-full max-w-none"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

      <div className="absolute inset-x-0 bottom-8 flex flex-col gap-3 px-5 sm:bottom-16 sm:px-8 lg:bottom-[120px] lg:left-[82px] lg:max-w-[760px] lg:px-0">
        <CharReveal
          as="h1"
          blur
          className="font-eb-garamond text-[clamp(3rem,8vw,96px)] font-semibold leading-none tracking-[-1px] text-white"
          segments={[{ text: "See for yourself." }]}
        />
        <FadeUp
          as="p"
          className="font-inter text-lg font-normal leading-[1.4] text-[#D6E4F0] sm:text-2xl"
          delay={0.3}
        >
          Bring the problem you cannot say out loud.
        </FadeUp>
      </div>
    </section>
  );
}
