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
      "Our technology solutions are purpose-built for the national security enterprise. We integrate advanced platforms, data architectures, and automation pipelines that enable faster, more informed operations at every echelon.",
  },
  {
    number: "03",
    title: "National-Scale Delivery",
    description:
      "From concept to deployment, we execute programs at scale — managing complex, distributed initiatives with the operational discipline, partner coordination, and mission alignment required to deliver lasting impact.",
  },
];

const tiles = [
  { width: 19, color: "#E83387" },
  { width: 62, color: "#F08A22" },
  { width: 19, color: "#D7A92C" },
  { width: 19, color: "#19B8B7" },
  { width: 18, color: "#23B6D2" },
];

export default function OurApproachSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F0EA] py-10 sm:py-12 lg:py-16">
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
        className={`${HOME_CONTENT_SHELL} relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12`}
      >
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <h2 className="font-eb-garamond text-[clamp(2.2rem,5vw,62.341px)] font-bold uppercase leading-none text-[#C6A02C]">
              Our Approach
            </h2>
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

          <div>
            <div className="h-1 w-full bg-[#111]" />
            {approachItems.map((item, index) => (
              <div
                key={item.title}
                className={`border-[#111] py-5 sm:py-7 ${index < approachItems.length - 1 ? "border-b" : ""}`}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span className="font-eb-garamond text-sm font-normal text-[#E8E3D9] sm:text-[15.746px]">
                      {item.number}
                    </span>
                    <h3 className="font-archivo-narrow text-lg font-bold uppercase leading-none text-[#111] sm:text-[22.417px]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-archivo-narrow text-2xl leading-none text-[#111] sm:text-3xl">
                    +
                  </span>
                </div>
                <p className="font-eb-garamond text-base font-normal leading-normal text-[#21211C] opacity-70 sm:text-[17.933px]">
                  {item.description}
                </p>
              </div>
            ))}
            <div className="h-1 w-full bg-[#111]" />
          </div>
        </div>

        <div className="relative h-[400px] w-full overflow-hidden border border-[#111] sm:h-[520px] lg:h-[760px]">
          <Image
            src="/Home/HOME3.png"
            alt="Our approach operations visual"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
