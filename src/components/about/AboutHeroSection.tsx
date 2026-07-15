export default function AboutHeroSection() {
  return (
    <section className="flex flex-col items-center gap-10 px-5 pb-16 pt-24 text-center sm:px-8 lg:px-[120px] lg:pb-20 lg:pt-[120px]">
      <div className="flex max-w-[1200px] flex-col items-center gap-6">
        <p className="font-inter text-sm font-medium uppercase text-[#C6A02C]">
          Sovereign Decision Architecture
        </p>

        <h1 className="font-eb-garamond text-[clamp(2.5rem,6vw,84px)] font-medium leading-[1.05] text-[#111]">
          We build sovereign intelligence. Owned by the state that uses it.
        </h1>
      </div>

      <p className="max-w-[600px] font-inter text-lg font-normal leading-[1.6] text-[#111]/70">
        Institutional-grade infrastructure designed for strategic independence.
        Quiet by design. Private by architecture.
      </p>
    </section>
  );
}
