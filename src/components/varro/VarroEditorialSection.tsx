import Image from "next/image";
import VarroMissionScreen from "@/components/varro/VarroMissionScreen";

const metrics = [
  {
    label: "Alert",
    title: "Alert latency",
    body: "< 2 sec — The warning beats the crisis. In your hand, anywhere, the moment something crosses the line.",
  },
  {
    label: "Case",
    title: "Time to evidence file",
    body: "Seconds — A court-ready case. A hostile account becomes a complete evidence file. Seconds, not weeks.",
  },
];

export default function VarroEditorialSection() {
  return (
    <section className="px-5 pb-12 pt-8 sm:px-8 lg:px-20 lg:pb-16 lg:pt-12">
      <div className="mx-auto flex w-full max-w-[1568px] flex-col gap-16 lg:gap-24">
        {/* Documents + Alert / Case metrics */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative h-[280px] w-full overflow-hidden sm:h-[380px] lg:h-full lg:min-h-[500px]">
            <Image
              src="/Varro/Home3.png"
              alt="Intelligence documents and briefing materials"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 733px"
            />
          </div>

          <div className="flex flex-col gap-10 lg:gap-12">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-5">
                <p className="font-schibsted-grotesk text-xs font-semibold uppercase leading-normal text-[#A38F75]">
                  {metric.label}
                </p>
                <div className="h-px w-full bg-[#D9D7D2]" />
                <div className="flex flex-col gap-3">
                  <p className="font-schibsted-grotesk text-sm font-semibold leading-normal text-[#2C2A26]">
                    {metric.title}
                  </p>
                  <p className="font-inter text-base font-normal leading-[1.5] text-[#8C8A85]">
                    {metric.body}
                  </p>
                </div>
              </div>
            ))}

            <blockquote className="border border-[#D9D7D2] p-8 font-eb-garamond text-xl font-normal leading-normal text-[#A38F75] sm:text-2xl">
              &ldquo;VARRO brings the verdict. A person makes the decision.
              Always.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Two-column editorial: 40/60 split, card aligned with paragraph */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-x-20">
          {/* Left column */}
          <div className="flex flex-col">
            <h2 className="font-eb-garamond text-[clamp(1.75rem,4vw,40px)] font-normal uppercase leading-[1.15] text-[#2C2A26]">
              Not a report. A standing capability.
            </h2>

            <p className="mt-8 max-w-[480px] font-inter text-base font-normal leading-[1.8] text-[#4A4844] sm:text-lg lg:mt-10 lg:text-[17px]">
              Every output, drawn from one mind, surfaces in one place. One
              screen. Every signal. Under your command. Internal and external,
              open and closed, speech, text, image and broadcast. Varro Fusion
              pulls every source and every module into a single live picture.
              One room sees the whole field. One hand moves on it.
            </p>

            <div className=" flex flex-col gap-4  lg:pt-20">
              <p className="font-eb-garamond text-sm font-normal uppercase tracking-[3px] text-[#BF610A]">
                03 . The daily verdict
              </p>
              <p className="font-eb-garamond text-[clamp(2.5rem,8vw,80px)] font-normal italic leading-[1.1] tracking-[-1px] text-[#151518]">
                Pulse on the realm.
              </p>
            </div>
          </div>

          {/* Right column — card offset to align with paragraph start */}
          <div className="flex flex-col gap-6 lg:pt-[100px]">
            <VarroMissionScreen className="min-h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] lg:min-h-[480px]" />
            <p className="self-end text-right font-archivo-narrow text-xs font-normal uppercase leading-relaxed tracking-[1.8px] text-[#73706E] sm:text-sm">
              Illustrative. Real briefs carry no client mark
              <br />
              and name no source.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
