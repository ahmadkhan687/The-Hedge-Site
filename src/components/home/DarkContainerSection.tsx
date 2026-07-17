import Image from "next/image";
import Link from "next/link";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";
import { CharReveal } from "@/components/ui/text-reveal";

const bars = [
  { width: 65, color: "#E83387" },
  { width: 18, color: "#F08A22" },
  { width: 19, color: "#D7A92C" },
  { width: 19, color: "#19B8B7" },
  { width: 18, color: "#23B6D2" },
];

export default function DarkContainerSection() {
  return (
    <section className="w-full overflow-hidden bg-[#121416] text-white">
      {/* —— Mobile layout —— */}
      <div className={`${HOME_CONTENT_SHELL} flex flex-col gap-6 pt-10 pb-12 lg:hidden`}>
        <div className="flex flex-col gap-3">
          <p className="font-eb-garamond text-base font-bold uppercase leading-normal text-[#E83387]">
            02 - THE ANSWER
          </p>
          <div className="flex items-center gap-[5px]" aria-hidden="true">
            <span className="h-[10px] w-9 bg-[#E83387]" />
            <span className="h-[10px] w-9 bg-[#F08A22]" />
            <span className="h-[10px] w-9 bg-[#D7A92C]" />
            <span className="h-[10px] w-9 bg-[#23B6D2]" />
          </div>
        </div>

        <div className="relative -mx-5 aspect-[4/3] w-[calc(100%+2.5rem)] overflow-hidden rounded-sm sm:-mx-6 sm:w-[calc(100%+3rem)]">
          <Image
            src="/Home/varo.png"
            alt="Varro command console interface"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 0px"
            priority
          />
        </div>

        <p className="font-eb-garamond text-base font-normal leading-[1.7] text-[#B8B8B8]">
          One mind that never sleeps. Agents watch every source — networks,
          narratives, signals — in real time, at national scale.
        </p>

        <h2 className="font-eb-garamond text-[clamp(3.5rem,14vw,5rem)] font-bold leading-none tracking-[-2px] text-[#F4F0EA]">
          VARRO
        </h2>

        <CharReveal
          as="p"
          blur
          className="font-inter text-sm font-extrabold uppercase leading-normal tracking-[0.04em] text-[#C6A02C]"
          segments={[
            { text: "The system a state " },
            { text: "sees with.", className: "italic" },
          ]}
        />

        <Link
          href="/varro"
          className="mt-2 flex min-h-[52px] w-full items-center justify-center border border-white bg-transparent font-inter text-sm font-extrabold uppercase leading-normal tracking-[0.04em] text-white no-underline transition-opacity hover:opacity-80"
        >
          More About Us
        </Link>
      </div>

      {/* —— Desktop layout —— */}
      <div
        className={`${HOME_CONTENT_SHELL} hidden flex-col gap-8 pb-[3.9rem] pt-[76px] lg:flex lg:gap-12`}
      >
        <div className="grid grid-cols-2 gap-14">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-4">
              <p className="font-eb-garamond text-xl font-bold uppercase leading-normal text-[#C6A02C]">
                02 - THE ANSWER
              </p>
              <div className="flex items-center gap-[6px]" aria-hidden="true">
                {bars.map((bar) => (
                  <span
                    key={bar.color}
                    className="h-[9px] shrink-0"
                    style={{ width: bar.width, backgroundColor: bar.color }}
                  />
                ))}
              </div>
            </div>

            <h2 className="font-eb-garamond text-[clamp(2.75rem,10vw,7.875rem)] font-bold leading-[100%] tracking-[-3.5px] text-white">
              VARRO
            </h2>

            <CharReveal
              as="p"
              blur
              className="font-eb-garamond text-[clamp(1.45rem,5vw,2.5rem)] font-medium leading-[90%] text-[#FBFAF7]"
              segments={[
                { text: "The system a state " },
                {
                  text: "sees with.",
                  className: "font-semibold italic text-[#C6A02C]",
                },
              ]}
            />
          </div>

          <div className="flex flex-col items-start gap-10 pt-5">
            <div className="font-eb-garamond text-xl font-normal leading-[200%] text-white">
              <p>
                At its core, one mind that never sleeps. Agents watch every
                source. Networks, narratives, signals, movements. Each one
                assessed, connected, and where it matters, escalated.
              </p>
              <p className="mt-4">
                It reads millions of signals a minute, and hands you the few
                that matter. The ones a human would have missed. The ones that
                arrive before the crisis.
              </p>
            </div>

            <Link
              href="/varro"
              className="inline-flex min-h-[42px] items-center gap-3 rounded-sm bg-black/20 px-5 py-3 font-eb-garamond text-base font-normal leading-[14px] text-white transition-opacity hover:opacity-80"
            >
              More about us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="relative aspect-[1603/606] w-full overflow-hidden border border-white/20">
          <Image
            src="/Home/varo.png"
            alt="Varro command console interface"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 0px, (max-width: 1728px) calc(100vw - 140px), 1588px"
          />
        </div>
      </div>
    </section>
  );
}
