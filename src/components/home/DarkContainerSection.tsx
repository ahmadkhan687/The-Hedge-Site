import Image from "next/image";
import Link from "next/link";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";

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
      <div
        className={`${HOME_CONTENT_SHELL} flex flex-col gap-8 pt-10 pb-[3.9rem] sm:gap-10 sm:pt-10 sm:pb-[3.9rem] lg:gap-12 lg:pb-[3.9rem] lg:pt-[76px]`}
      >
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-5 sm:gap-7">
            <div className="flex items-center gap-4">
              <p className="font-eb-garamond text-lg font-bold uppercase leading-normal text-[#C6A02C] sm:text-xl">
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

            <h2 className="font-eb-garamond text-[clamp(2.75rem,10vw,7.875rem)] font-bold leading-[100%] tracking-[-2px] text-white sm:tracking-[-3.5px]">
              VARRO
            </h2>

            <p className="font-eb-garamond text-[clamp(1.45rem,5vw,2.5rem)] font-medium leading-[95%] text-[#FBFAF7] sm:leading-[90%]">
              The system a state{" "}
              <span className="font-semibold italic text-[#C6A02C]">sees with.</span>
            </p>
          </div>

          <div className="flex flex-col items-start gap-8 sm:gap-10 lg:pt-5">
            <div className="font-eb-garamond text-base font-normal leading-[180%] text-white sm:text-lg sm:leading-[190%] lg:text-xl lg:leading-[200%]">
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
              className="inline-flex min-h-[42px] items-center gap-3 rounded-sm bg-black/20 px-5 py-3 font-eb-garamond text-sm font-normal leading-[14px] text-white transition-opacity hover:opacity-80 sm:text-base"
            >
              More about us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/20 sm:aspect-[1603/606]">
          <Image
            src="/Home/varo.png"
            alt="Varro command console interface"
            fill
            className="object-cover"
            sizes="(max-width: 1728px) 100vw, 1728px"
          />
        </div>
      </div>
    </section>
  );
}
