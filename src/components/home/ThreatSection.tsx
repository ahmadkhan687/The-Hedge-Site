import Image from "next/image";
import Link from "next/link";
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
        className={`${HOME_CONTENT_SHELL} relative z-10 flex flex-col items-start gap-5 py-10 sm:gap-8 sm:py-14 lg:gap-12 lg:py-[100px]`}
      >
        <div className="flex flex-col gap-3">
          <p className="font-eb-garamond text-base font-bold uppercase leading-normal text-[#E83387] sm:text-lg lg:text-xl">
            01 - THE THREAT
          </p>

          {/* Mobile-only color bars */}
          <div className="flex items-center gap-[5px] lg:hidden" aria-hidden="true">
            <span className="h-[10px] w-9 bg-[#E83387]" />
            <span className="h-[10px] w-9 bg-[#F08A22]" />
            <span className="h-[10px] w-9 bg-[#D7A92C]" />
            <span className="h-[10px] w-9 bg-[#23B6D2]" />
          </div>
        </div>

        <h2 className="font-eb-garamond text-[clamp(1.875rem,7.5vw,64px)] font-medium leading-[1.05] text-[#111111]">
          A machine now decides what a{" "}
          {/* Mobile: italic · Desktop: gold highlight */}
          <span className="italic lg:not-italic lg:bg-[#C6A02C] lg:px-2 lg:text-[#F3F1EA]">
            nation sees.
          </span>
        </h2>

        <p className="max-w-[720px] font-eb-garamond text-base font-normal leading-[160%] text-[#111] lg:font-inter lg:text-xl lg:text-[#6B665F]">
          It writes faster than a country can read. It can fake a face, a voice,
          a government&apos;s own signature. It can place a lie in a million
          places at once, and leave no prints.
        </p>

        {/* Desktop-only closing line */}
        <p className="hidden font-eb-garamond text-[clamp(1.375rem,3vw,28.488px)] font-medium leading-[0.9] text-[#111111] lg:block">
          So we built the means to{" "}
          <span className="italic">see through it.</span>
        </p>

        {/* Mobile-only CTA */}
        <Link
          href="/request-access"
          className="mt-2 flex min-h-[52px] w-full items-center justify-center border-2 border-[#111] bg-transparent font-inter text-sm font-extrabold uppercase leading-normal text-[#111] no-underline transition-opacity hover:opacity-80 lg:hidden"
        >
          Request Briefing
        </Link>
      </div>
    </section>
  );
}
