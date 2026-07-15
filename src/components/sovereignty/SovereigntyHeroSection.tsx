export default function SovereigntyHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F0EA]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <video
          className="h-full w-full object-cover object-top opacity-[0.42] mix-blend-color-burn"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Sovereignity/Video Project 18.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[600px] w-full max-w-[1488px] flex-col gap-6 px-5 pb-16 pt-12 sm:px-8 lg:min-h-[900px] lg:px-[120px] lg:pb-24 lg:pt-24">
        <p className="font-inter text-base font-extrabold uppercase text-[#C6A02C]">
          Own it. On your terms.
        </p>

        <div className="flex max-w-[641px] flex-col gap-6">
          <h1 className="font-eb-garamond text-[clamp(3rem,8vw,96px)] font-medium leading-[1.1] text-[#111]">
            See. Judge. Own.
          </h1>

          <p className="font-inter text-base font-normal uppercase text-[#111]/80">
            Sovereign capability · Est. 2024
          </p>

          <p className="font-inter text-base font-normal leading-[1.6] text-[#111]/70">
            Sovereign intelligence infrastructure, engineered for those who act
            with authority. Built for decision-makers who operate at the edge of
            consequence, where clarity is a force multiplier and hesitation is a
            liability.
          </p>
        </div>
      </div>
    </section>
  );
}
