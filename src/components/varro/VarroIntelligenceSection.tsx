import Image from "next/image";

const faculties = [
  {
    title: "THE EYES",
    body: "Agents. Thousands of them, reading every source at once. Web, broadcast, posts, channels, speech, imagery, your own files.",
    bodyMobile:
      "Agents. Thousands of them, reading every source at once. Web, broadcast, posts, channels, speech, imagery, your own files.",
  },
  {
    title: "THE UNDERSTANDING",
    body: "Semantic neural networks. They read meaning, intent and coordination, not just words. In any language. They tell the real from the fake.",
    bodyMobile:
      "Semantic neural networks. They read meaning, intent and coordination, not just words. In any language.",
  },
  {
    title: "THE LEARNING",
    body: "Memory. Every case is kept. The mind connects today to last year, and gets sharper with every pass.",
    bodyMobile:
      "Memory. Every case is kept. The mind connects today to last year, and gets sharper with every pass.",
  },
];

export default function VarroIntelligenceSection() {
  return (
    <section className="bg-[#F5F0E8] pb-8 lg:pb-12">
      <div className="px-5 sm:px-8 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1568px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
          {/* Faculty card — desktop only (mobile lives in hero) */}
          <div className="hidden h-[100px] w-[187px] shrink-0 flex-col gap-2 rounded-sm border border-[#2C2A26] bg-[#F5F0E8] p-3 lg:flex">
            <p className="font-eb-garamond text-xs font-bold uppercase leading-normal text-[#4A4844]">
              Faculty
            </p>
            <div className="h-px w-6 bg-[#2C2A26]/25" />
            <p className="font-eb-garamond text-[13px] font-normal leading-[1.35] text-[#4A4844]">
              Sovereign intelligence
            </p>
          </div>

          <div className="flex max-w-[624px] flex-col gap-8 text-[#4A4844] lg:gap-14">
            {/* Mobile intro */}
            <p className="font-inter text-base font-normal leading-[1.7] text-[#333] lg:hidden">
              At VARRO&apos;s centre: a single intelligence reading millions of
              signals per minute. Internal and open. It never stops.
            </p>

            {/* Desktop intro */}
            <p className="hidden font-inter text-lg font-normal leading-[1.8] lg:block lg:text-xl">
              At the centre of VARRO is a single intelligence. It reads millions
              of signals a minute, internal and external, open and closed, and
              turns them into one clear picture. It is built from three
              faculties.
            </p>

            <div className="flex flex-col gap-8 lg:gap-9">
              {faculties.map((faculty) => (
                <div key={faculty.title} className="flex flex-col gap-2">
                  <h3 className="font-eb-garamond text-[22px] font-bold uppercase leading-normal text-[#2C2A26] lg:text-[26px]">
                    {faculty.title}
                  </h3>
                  <p className="font-inter text-base font-normal leading-[1.7] text-[#333] lg:hidden">
                    {faculty.bodyMobile}
                  </p>
                  <p className="hidden font-inter text-lg font-normal leading-[1.8] lg:block lg:text-xl">
                    {faculty.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop quote (side column) */}
          <blockquote className="hidden max-w-[405px] font-eb-garamond text-[clamp(1.75rem,4vw,48px)] font-normal leading-[1.2] text-[#2C2A26] lg:block lg:pt-[120px]">
            &ldquo;The warning beats the crisis. In your hand, anywhere, the
            moment something crosses the line.&rdquo;
          </blockquote>
        </div>

        {/* Mobile quote — full-width editorial block */}
        <blockquote className="mx-auto mt-10 max-w-[1568px] pb-6 font-eb-garamond text-[clamp(1.75rem,7vw,2.5rem)] font-normal leading-[1.35] text-[#2C2A26] lg:hidden">
          &ldquo;The warning beats the
          <br />
          crisis. In your hand,
          <br />
          anywhere, the moment
          <br />
          something crosses the line.&rdquo;
        </blockquote>
      </div>

      {/* Mobile banner */}
      <div className="relative mt-6 h-[280px] w-full overflow-hidden sm:mt-16 sm:h-[420px] lg:hidden">
        <Image
          src="/Varro/bannermobile.webp"
          alt="Varro intelligence banner visual"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Desktop banner — match image aspect ratio so overlay text never crops */}
      <div className="relative mt-20 hidden aspect-[1728/600] w-full overflow-hidden lg:block">
        <Image
          src="/Varro/banner.webp"
          alt="Varro intelligence banner visual"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
