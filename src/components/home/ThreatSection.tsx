import Image from "next/image";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";

export default function ThreatSection() {
  return (
    <section id="threat" className="relative overflow-hidden bg-[#F4F0EA]">
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        aria-hidden="true"
      >
        <Image
          src="/Home/world-map.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div
        className={`${HOME_CONTENT_SHELL} relative z-10 flex flex-col items-start gap-6 py-10 sm:gap-10 sm:py-14 lg:gap-12 lg:py-[100px]`}
      >
        <p className="font-eb-garamond text-lg font-bold uppercase leading-normal text-[#E83387] sm:text-xl">
          01 - THE THREAT
        </p>

        <h2 className="font-eb-garamond text-[clamp(1.75rem,7vw,64px)] font-medium leading-[0.95] text-[#111111]">
          A machine now decides what a{" "}
          <span className="bg-[#C6A02C] px-2 text-[#F3F1EA]">nation sees.</span>
        </h2>

        <p className="max-w-[720px] font-inter text-base font-normal leading-[160%] text-[#6B665F] sm:text-lg lg:text-xl">
          It writes faster than a country can read. It can fake a face, a voice,
          a government&apos;s own signature. It can place a lie in a million
          places at once, and leave no prints.
        </p>

        <p className="font-eb-garamond text-[clamp(1.375rem,3vw,28.488px)] font-medium leading-[0.9] text-[#111111]">
          So we built the means to{" "}
          <span className="italic">see through it.</span>
        </p>
      </div>
    </section>
  );
}
