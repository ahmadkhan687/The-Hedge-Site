import Link from "next/link";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";

const tiles = [
  { width: 19, color: "#E83387" },
  { width: 19, color: "#F08A22" },
  { width: 19, color: "#D7A92C" },
  { width: 19, color: "#19B8B7" },
  { width: 224, color: "#23B6D2" },
];

export default function PerspectiveSection() {
  return (
    <section className="w-full bg-[#FBFAF7] py-8 sm:py-10 lg:py-14">
      <div
        className={`${HOME_CONTENT_SHELL} flex flex-col gap-6 sm:gap-10 lg:h-[647px] lg:gap-12 lg:py-12`}
      >
        <div className="flex flex-col gap-2 sm:gap-3">
          <p className="font-eb-garamond text-xl font-bold uppercase leading-none text-[#D7A92C] sm:text-[30px] lg:text-[36px]">
            05 - Perspective
          </p>
          <div className="flex items-center gap-[6px] overflow-hidden" aria-hidden="true">
            {tiles.map((tile) => (
              <span
                key={`${tile.color}-${tile.width}`}
                className="h-[9px] shrink-0"
                style={{ width: tile.width, backgroundColor: tile.color }}
              />
            ))}
          </div>
        </div>

        <div className="h-[4px] w-full bg-[#111]" />

        <h2 className="w-full font-eb-garamond text-[clamp(2rem,8vw,96px)] font-medium leading-[100%] text-[#111]">
          A nation that secures itself keeps its{" "}
          <span className="italic">own counsel.</span>
        </h2>

        <Link
          href="/request-access"
          className="inline-flex min-h-[44px] w-full items-center justify-center border-2 border-[#111] bg-[#111] px-5 py-3 font-inter text-sm font-extrabold uppercase leading-normal text-[#FBFAF7] no-underline transition-opacity hover:opacity-80 sm:w-fit sm:px-[22px] sm:py-[15px] sm:text-base"
        >
          Request a briefing
        </Link>
      </div>
    </section>
  );
}
