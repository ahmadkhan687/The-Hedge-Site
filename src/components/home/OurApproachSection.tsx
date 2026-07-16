import Image from "next/image";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";

const approachItems = [
  {
    number: "01",
    title: "Intelligence Products",
    description:
      "We design and deliver tailored intelligence products — from all-source analytical reports to structured decision-support frameworks — that give leaders the clarity to act with confidence in contested environments.",
  },
  {
    number: "02",
    title: "Strategic Technology",
    description:
      "Purpose-built for national security. We integrate advanced sensing, AI-driven analysis, and sovereign infrastructure into one decisive platform.",
  },
  {
    number: "03",
    title: "National-Scale Delivery",
    description:
      "From concept to deployment, we execute programs at scale — managing complex, distributed initiatives with the operational discipline, partner coordination, and mission alignment required to deliver lasting impact.",
  },
];

const desktopTiles = [
  { width: 19, color: "#E83387" },
  { width: 62, color: "#F08A22" },
  { width: 19, color: "#D7A92C" },
  { width: 19, color: "#19B8B7" },
  { width: 18, color: "#23B6D2" },
];

export default function OurApproachSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F4F0EA] py-10 sm:py-12 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-15"
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
        className={`${HOME_CONTENT_SHELL} relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12`}
      >
        {/* Header — always first */}
        <div className="space-y-3 lg:col-start-1 lg:row-start-1">
          <h2 className="font-inter text-sm font-extrabold uppercase leading-none tracking-[0.04em] text-[#C6A02C] lg:font-eb-garamond lg:text-[clamp(2rem,5vw,62.341px)] lg:font-bold lg:tracking-normal">
            Our Approach
          </h2>

          {/* Mobile: 4 equal bars · Desktop: existing tile widths */}
          <div className="flex items-center gap-[5px] lg:hidden" aria-hidden="true">
            <span className="h-[10px] w-9 bg-[#E83387]" />
            <span className="h-[10px] w-9 bg-[#F08A22]" />
            <span className="h-[10px] w-9 bg-[#D7A92C]" />
            <span className="h-[10px] w-9 bg-[#23B6D2]" />
          </div>
          <div className="hidden items-center gap-[6px] lg:flex" aria-hidden="true">
            {desktopTiles.map((tile) => (
              <span
                key={`${tile.color}-${tile.width}`}
                className="h-[9px] shrink-0"
                style={{ width: tile.width, backgroundColor: tile.color }}
              />
            ))}
          </div>
        </div>

        {/* Image — second on mobile, right column on desktop */}
        <div className="relative aspect-square w-full overflow-hidden border border-[#111] sm:aspect-auto sm:h-[520px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[760px]">
          <Image
            src="/Home/HOME3.png"
            alt="Our approach operations visual"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* List — third on mobile, under header on desktop */}
        <div className="lg:col-start-1 lg:row-start-2">
          {/* Desktop: thick black rules */}
          <div className="hidden h-1 w-full bg-[#111] lg:block" />

          {approachItems.map((item, index) => (
            <div
              key={item.title}
              className={`py-6 lg:py-7 ${
                index < approachItems.length - 1
                  ? "border-b border-[#111]/15 lg:border-[#111]"
                  : ""
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-3 sm:gap-4">
                  <span className="font-eb-garamond text-base font-medium text-[#C6A02C] lg:text-[15.746px] lg:font-normal lg:text-[#C8C2B6]">
                    {item.number}
                  </span>
                  <h3 className="font-eb-garamond text-xl font-semibold leading-tight text-[#111] lg:font-archivo-narrow lg:text-[22.417px] lg:font-bold lg:uppercase lg:leading-none">
                    {item.title}
                  </h3>
                </div>
                {/* + icon desktop only */}
                <span className="hidden font-archivo-narrow text-3xl leading-none text-[#111] lg:inline">
                  +
                </span>
              </div>
              <p className="font-eb-garamond text-sm font-normal leading-[160%] text-[#4A4844] lg:text-[17.933px] lg:leading-normal lg:text-[#21211C] lg:opacity-70">
                {item.description}
              </p>
            </div>
          ))}

          <div className="hidden h-1 w-full bg-[#111] lg:block" />
        </div>
      </div>
    </section>
  );
}
