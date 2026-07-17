import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";
import { MotionCTA, WordReveal } from "@/components/ui/text-reveal";

const desktopTiles = [
  { width: 19, color: "#E83387" },
  { width: 19, color: "#F08A22" },
  { width: 19, color: "#D7A92C" },
  { width: 19, color: "#19B8B7" },
  { width: 224, color: "#23B6D2" },
];

export default function PerspectiveSection() {
  return (
    <section className="w-full bg-[#FBFAF7] py-10 lg:py-14">
      <div
        className={`${HOME_CONTENT_SHELL} flex flex-col gap-6 lg:h-[647px] lg:gap-12 lg:py-12`}
      >
        <div className="flex flex-col gap-3">
          {/* Mobile: small sans-serif · Desktop: large serif */}
          <p className="font-inter text-sm font-extrabold uppercase leading-none tracking-[0.04em] text-[#C6A02C] lg:font-eb-garamond lg:text-[36px] lg:font-bold lg:tracking-normal">
            05 - Perspective
          </p>

          {/* Mobile: 4 equal bars */}
          <div
            className="flex items-center gap-[5px] lg:hidden"
            aria-hidden="true"
          >
            <span className="h-[10px] w-9 bg-[#E83387]" />
            <span className="h-[10px] w-9 bg-[#F08A22]" />
            <span className="h-[10px] w-9 bg-[#D7A92C]" />
            <span className="h-[10px] w-9 bg-[#23B6D2]" />
          </div>

          {/* Desktop: existing tiles */}
          <div
            className="hidden items-center gap-[6px] overflow-hidden lg:flex"
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

        <div className="h-[3px] w-full bg-[#111] lg:h-[4px]" />

        <WordReveal
          as="h2"
          className="w-full font-eb-garamond text-[clamp(2rem,9vw,96px)] font-medium leading-[1.05] text-[#111] lg:leading-[100%]"
          segments={[
            { text: "A nation that secures itself keeps its " },
            { text: "own counsel.", className: "italic" },
          ]}
        />

        <MotionCTA
          href="/request-access"
          tapScale={0.95}
          className="inline-flex min-h-[52px] w-full items-center justify-start border-2 border-[#111] bg-[#111] px-5 py-3 font-inter text-sm font-extrabold uppercase leading-normal text-[#FBFAF7] no-underline transition-opacity hover:opacity-80 lg:min-h-[44px] lg:w-fit lg:justify-center lg:px-[22px] lg:py-[15px] lg:text-base"
        >
          Request a briefing
        </MotionCTA>
      </div>
    </section>
  );
}
