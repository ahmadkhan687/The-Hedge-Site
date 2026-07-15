export default function DomainsPrecisionCallout() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A10] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-24">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-8">
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
