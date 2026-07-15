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

        {/* Matches Figma: body top-left, Pulse bottom-left beside lower card, card on right */}
        <div className="flex flex-col gap-8">
          <h2 className="max-w-[720px] font-eb-garamond text-[clamp(1.75rem,4vw,40px)] font-normal uppercase leading-normal text-[#2C2A26]">
            Not a report. A standing capability.
          </h2>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-x-16">
            <div className="flex min-h-0 flex-col">
              <p className="max-w-[560px] font-inter text-base font-normal leading-[1.8] text-[#4A4844] sm:text-lg lg:text-xl">
                Every output, drawn from one mind, surfaces in one place. One
                screen. Every signal. Under your command. Internal and external,
                open and closed, speech, text, image and broadcast. Varro Fusion
                pulls every source and every module into a single live picture.
                One room sees the whole field. One hand moves on it.
              </p>

              <div className="mt-12 flex flex-col gap-4 lg:mt-auto lg:pt-24">
                <p className="font-eb-garamond text-sm font-normal uppercase tracking-[3px] text-[#BF610A]">
                  03 . The daily verdict
                </p>
                <p className="font-eb-garamond text-[clamp(2.5rem,8vw,80px)] font-normal italic leading-[1.1] tracking-[-1px] text-[#151518]">
                  Pulse on the realm.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <VarroMissionScreen className="min-h-[480px] lg:min-h-[560px]" />
              <p className="self-end text-right font-archivo-narrow text-xs font-normal uppercase leading-relaxed tracking-[1.8px] text-[#73706E] sm:text-sm">
                Illustrative. Real briefs carry no client mark
                <br />
                and name no source.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
