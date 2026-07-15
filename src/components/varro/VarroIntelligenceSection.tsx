import Image from "next/image";

const faculties = [
  {
    title: "THE EYES",
    body: "Agents. Thousands of them, reading every source at once. Web, broadcast, posts, channels, speech, imagery, your own files.",
  },
  {
    title: "THE UNDERSTANDING",
    body: "Semantic neural networks. They read meaning, intent and coordination, not just words. In any language. They tell the real from the fake.",
  },
  {
    title: "THE LEARNING",
    body: "Memory. Every case is kept. The mind connects today to last year, and gets sharper with every pass.",
  },
];

export default function VarroIntelligenceSection() {
  return (
    <section className="pb-8 lg:pb-12">
      <div className="px-5 sm:px-8 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1568px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
          <div className="flex h-[100px] w-[187px] shrink-0 flex-col gap-2 rounded-sm border border-[#2C2A26] bg-[#F5F0E8] p-3">
            <p className="font-eb-garamond text-xs font-bold uppercase leading-normal text-[#4A4844]">
              Faculty
            </p>
            <div className="h-px w-6 bg-[#2C2A26]/25" />
            <p className="font-eb-garamond text-[13px] font-normal leading-[1.35] text-[#4A4844]">
              Sovereign intelligence
            </p>
          </div>

          <div className="flex max-w-[624px] flex-col gap-10 text-[#4A4844] lg:gap-14">
            <p className="font-inter text-lg font-normal leading-[1.8] lg:text-xl">
              At the centre of VARRO is a single intelligence. It reads millions of
              signals a minute, internal and external, open and closed, and turns
              them into one clear picture. It is built from three faculties.
            </p>

            <div className="flex flex-col gap-9">
              {faculties.map((faculty) => (
                <div key={faculty.title} className="flex flex-col gap-2">
                  <h3 className="font-eb-garamond text-[26px] font-bold leading-normal">
                    {faculty.title}
                  </h3>
                  <p className="font-inter text-lg font-normal leading-[1.8] lg:text-xl">
                    {faculty.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="max-w-[405px] pt-0 font-eb-garamond text-[clamp(1.75rem,4vw,48px)] font-normal leading-[1.2] text-[#2C2A26] lg:pt-[120px]">
            &ldquo;The warning beats the crisis. In your hand, anywhere, the moment
            something crosses the line.&rdquo;
          </blockquote>
        </div>
      </div>

      <div className="relative mt-12 h-[320px] w-full overflow-hidden sm:mt-16 sm:h-[420px] lg:mt-20 lg:h-[600px]">
        <Image
          src="/Varro/banner.png"
          alt="Varro intelligence banner visual"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
