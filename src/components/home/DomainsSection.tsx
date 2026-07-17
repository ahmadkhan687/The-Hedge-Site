import Image from "next/image";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";
import { HoverScale, WordReveal } from "@/components/ui/text-reveal";

const desktopTiles = [
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
      <Image
        src="/Home/world-map.webp"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none object-cover object-center opacity-20 invert mix-blend-multiply"
      />

      <div
        className={`${HOME_CONTENT_SHELL} relative z-10 flex flex-col gap-6 lg:gap-14`}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-4">
            <p className="font-eb-garamond text-base font-bold uppercase leading-normal text-[#C6A02C] lg:text-xl">
              03 - Domains
            </p>

            {/* Mobile: 4 equal bars under label */}
            <div
              className="flex items-center gap-[5px] lg:hidden"
              aria-hidden="true"
            >
              <span className="h-[10px] w-9 bg-[#E83387]" />
              <span className="h-[10px] w-9 bg-[#F08A22]" />
              <span className="h-[10px] w-9 bg-[#D7A92C]" />
              <span className="h-[10px] w-9 bg-[#23B6D2]" />
            </div>

            {/* Desktop: existing tiles inline */}
            <div
              className="hidden items-center gap-[6px] lg:flex"
              aria-hidden="true"
            >
              {desktopTiles.map((tile) => (
                <span
                  key={`${tile.color}-${tile.width}`}
                  className="h-[9px] shrink-0"
                  style={{ width: tile.width, backgroundColor: tile.color }}
                />
              ))}
            </div>
          </div>

          <WordReveal
            as="h2"
            className="max-w-[1200px] font-eb-garamond text-[clamp(1.875rem,7vw,64px)] font-medium leading-[1.05] text-[#111] lg:leading-[90%]"
            segments={[
              { text: "We point that mind at the " },
              { text: "threats", className: "font-semibold italic" },
              { text: " that move fastest." },
            ]}
          />
        </div>

        {/* Image — second on mobile, last on desktop */}
        <div className="relative order-2 aspect-[16/10] w-full overflow-hidden border border-[#111] lg:order-3 lg:aspect-[537/302]">
          <Image
            src="/Home/HOME4.webp"
            alt="Intelligence domains visualization"
            fill
            className="object-cover"
            sizes="(max-width: 1728px) 100vw, 1728px"
          />
        </div>

        {/* Domain list — third on mobile, middle on desktop */}
        <div className="order-3 lg:order-2">
          {/* Mobile: "Domain" label + thick rule, then stacked items */}
          <div className="lg:hidden">
            <div className="flex flex-col gap-2">
              <p className="font-eb-garamond text-base font-medium text-[#111]">
                Domain
              </p>
              <div className="h-px w-full bg-[#111]" />
            </div>

            {domains.map((domain, index) => (
              <div
                key={domain}
                className={`py-5 ${
                  index < domains.length - 1
                    ? "border-b border-[#111]/15"
                    : ""
                }`}
              >
                <p className="font-eb-garamond text-xl font-medium leading-[1.1] text-[#111]">
                  <HoverScale>{domain}</HoverScale>
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: 3-column row */}
          <div className="hidden grid-cols-3 lg:grid">
            <div className="border-r border-[#111]/20 py-1 pr-4">
              <p className="mb-1 font-inter text-base font-extrabold uppercase leading-none text-[#6B665F]">
                Domain
              </p>
              <p className="font-eb-garamond text-[28px] font-medium leading-[90%] text-[#111]">
                <HoverScale>{domains[0]}</HoverScale>
              </p>
            </div>
            <p className="border-r border-[#111]/20 px-4 py-5 font-eb-garamond text-[28px] font-medium leading-[90%] text-[#111]">
              <HoverScale>{domains[1]}</HoverScale>
            </p>
            <p className="px-4 py-5 font-eb-garamond text-[28px] font-medium leading-[90%] text-[#111]">
              <HoverScale>{domains[2]}</HoverScale>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
