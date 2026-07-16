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
    <section className="bg-[#F5F0E8] px-5 pb-12 pt-8 sm:px-8 lg:px-20 lg:pb-16 lg:pt-12">
      <div className="mx-auto flex w-full max-w-[1568px] flex-col gap-12 lg:gap-24">
        {/* —— Mobile layout —— */}
        <div className="flex flex-col gap-6 lg:hidden">
          <div className="-mx-5 w-[calc(100%+2.5rem)]">
            <Image
              src="/Varro/Home3.png"
              alt="Intelligence documents and briefing materials"
              width={1200}
              height={700}
              className="block h-auto w-full"
              sizes="100vw"
            />
          </div>

          <h2 className="font-eb-garamond text-[clamp(1.75rem,7vw,2.25rem)] font-normal uppercase leading-[1.15] text-[#2C2A26]">
            Not a report. A standing capability.
          </h2>

          <p className="font-inter text-base font-normal leading-[1.7] text-[#6B665F]">
            Every output surfaces in one place. One screen. Every signal. Under
            your command and nobody else&apos;s.
          </p>

          <div className="flex flex-col gap-2">
            <p className="font-schibsted-grotesk text-xs font-semibold uppercase leading-normal text-[#A38F75]">
              Alert
            </p>
            <div className="h-px w-full bg-[#D9D7D2]" />
            <p className="pt-1 font-schibsted-grotesk text-sm font-semibold uppercase leading-normal text-[#2C2A26]">
              Alert latency
            </p>
            <p className="font-inter text-base font-normal leading-[1.5] text-[#8C8A85]">
              &lt; 2 sec — The warning beats the crisis.
            </p>
          </div>

          <blockquote className="border border-[#D9D7D2] p-6 font-eb-garamond text-xl font-normal italic leading-[1.4] text-[#A38F75]">
            &ldquo;VARRO brings the verdict. A person makes the decision.
            Always.&rdquo;
          </blockquote>
        </div>

        {/* —— Desktop: Documents + Alert / Case metrics —— */}
        <div className="hidden grid-cols-2 items-start gap-12 lg:grid">
          <div className="relative min-h-[500px] w-full overflow-hidden">
            <Image
              src="/Varro/Home3.png"
              alt="Intelligence documents and briefing materials"
              fill
              className="object-cover"
              sizes="733px"
            />
          </div>

          <div className="flex flex-col gap-12">
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

            <blockquote className="border border-[#D9D7D2] p-8 font-eb-garamond text-2xl font-normal leading-normal text-[#A38F75]">
              &ldquo;VARRO brings the verdict. A person makes the decision.
              Always.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Two-column editorial: Pulse + mission card */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-x-20">
          <div className="flex flex-col">
            {/* Headline + body only on desktop here (already shown on mobile above) */}
            <h2 className="hidden font-eb-garamond text-[clamp(1.75rem,4vw,40px)] font-normal uppercase leading-[1.15] text-[#2C2A26] lg:block">
              Not a report. A standing capability.
            </h2>

            <p className="mt-0 hidden max-w-[480px] font-inter text-[17px] font-normal leading-[1.8] text-[#4A4844] lg:mt-10 lg:block">
              Every output, drawn from one mind, surfaces in one place. One
              screen. Every signal. Under your command. Internal and external,
              open and closed, speech, text, image and broadcast. Varro Fusion
              pulls every source and every module into a single live picture.
              One room sees the whole field. One hand moves on it.
            </p>

            <div className="mt-4 flex flex-col gap-4 lg:mt-auto lg:pt-20">
              <p className="font-eb-garamond text-sm font-normal uppercase tracking-[3px] text-[#BF610A]">
                03 . The daily verdict
              </p>
              <p className="font-eb-garamond text-[clamp(2.5rem,8vw,80px)] font-normal italic leading-[1.1] tracking-[-1px] text-[#151518]">
                Pulse on the realm.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:pt-[100px]">
            <VarroMissionScreen className="min-h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] lg:min-h-[480px]" />
            <p className="hidden self-end text-right font-archivo-narrow text-xs font-normal uppercase leading-relaxed tracking-[1.8px] text-[#73706E] lg:block sm:text-sm">
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
