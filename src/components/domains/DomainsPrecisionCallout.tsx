import LoopingBackgroundVideo from "@/components/ui/LoopingBackgroundVideo";

export default function DomainsPrecisionCallout() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A10]">
      {/* Earth background video — loops while section is on screen */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <LoopingBackgroundVideo
          src="/Domains/Earth-revolving-optimized.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A10]/70" />
      </div>

      {/* —— Mobile layout —— */}
      <div className="relative z-10 px-5 py-14 sm:px-8 lg:hidden">
        <div className="mx-auto flex w-full max-w-[420px] flex-col gap-10">
          <div className="relative flex h-[72px] w-full items-center justify-center rounded-full border border-[#D7A92C]">
            <span className="font-eb-garamond text-[40px] font-medium leading-none text-[#D7A92C]">
              &ldquo;
            </span>
          </div>

          <blockquote className="font-eb-garamond text-[clamp(1.75rem,7.2vw,2.125rem)] font-medium leading-[1.25] text-[#F4F0EA]">
            Precision is not a feature.
            <br />
            It is the only acceptable
            <br />
            standard.
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="h-px w-10 shrink-0 bg-[#D7A92C]" />
            <p className="font-barlow-condensed text-sm font-extrabold uppercase tracking-[0.04em] text-[#F4F0EA]">
              Editorial
            </p>
          </div>
        </div>
      </div>

      {/* —— Desktop layout —— */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1488px] flex-col gap-8 px-5 py-16 sm:px-8 lg:flex lg:px-[120px] lg:py-24">
        <div className="flex size-24 items-center justify-center rounded-[48px] border border-[#D7A92C] bg-[#D7A92C]/10">
          <span className="font-eb-garamond text-[56px] font-medium leading-none text-[#D7A92C]">
            &ldquo;
          </span>
        </div>

        <blockquote className="max-w-[1200px] font-eb-garamond text-[clamp(1.75rem,4vw,56px)] font-medium leading-[1.15] text-[#F4F0EA]">
          Precision is not a feature. It is the only acceptable standard. In the
          domain of intelligence, a 1% margin of error is a catastrophic failure.
        </blockquote>

        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-[#D7A92C]" />
          <p className="font-barlow-condensed text-sm font-extrabold uppercase text-[#F4F0EA]">
            Editorial
          </p>
        </div>
      </div>
    </section>
  );
}
