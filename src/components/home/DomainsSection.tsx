import Image from "next/image";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";

const tiles = [
  { width: 19, color: "#E83387" },
  { width: 62, color: "#F08A22" },
  { width: 19, color: "#D7A92C" },
  { width: 19, color: "#19B8B7" },
  { width: 18, color: "#23B6D2" },
];

const domains = [
  "Synthetic Narrative Warfare",
  "Coordinated Networks",
  "Engineered Radicalisation",
];

export default function DomainsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F0EA] py-10 lg:py-14">
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

      <div className={`${HOME_CONTENT_SHELL} relative z-10 flex flex-col gap-8 sm:gap-10 lg:gap-14`}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <p className="font-eb-garamond text-lg font-bold uppercase leading-normal text-[#C6A02C] sm:text-xl">
              03 - Domains
            </p>
            <div className="flex items-center gap-[6px]" aria-hidden="true">
              {tiles.map((tile) => (
                <span
                  key={`${tile.color}-${tile.width}`}
                  className="h-[9px] shrink-0"
                  style={{ width: tile.width, backgroundColor: tile.color }}
                />
              ))}
            </div>
          </div>

          <h2 className="max-w-[1200px] font-eb-garamond text-[clamp(2rem,4.5vw,64px)] font-medium leading-[90%] text-[#111]">
            We point that mind at the{" "}
            <span className="font-semibold italic">threats</span> that move
            fastest.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-0">
          <div className="py-1 lg:border-r lg:border-[#111]/20 lg:pr-4">
            <p className="mb-1 font-inter text-sm font-extrabold uppercase leading-none text-[#6B665F] sm:text-base">
              Domain
            </p>
            <p className="font-eb-garamond text-2xl font-medium leading-[90%] text-[#111] sm:text-[28px]">
              {domains[0]}
            </p>
          </div>

          <p className="pb-1 pt-2 font-eb-garamond text-2xl font-medium leading-[90%] text-[#111] sm:pt-5 sm:text-[28px] lg:border-r lg:border-[#111]/20 lg:px-4">
            {domains[1]}
          </p>
          <p className="pb-1 pt-2 font-eb-garamond text-2xl font-medium leading-[90%] text-[#111] sm:pt-5 sm:text-[28px] lg:px-4">
            {domains[2]}
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden border border-[#111]"
          style={{ aspectRatio: "537 / 302" }}
        >
          <Image
            src="/Home/HOME4.png"
            alt="Intelligence domains visualization"
            fill
            className="object-cover"
            sizes="(max-width: 1728px) 100vw, 1728px"
          />
        </div>
      </div>
    </section>
  );
}
