import Image from "next/image";

export default function VarroHeroSection() {
  return (
    <>
      {/* Intro: Chapter / Varro / subtitle */}
      <section className="flex flex-col items-center bg-[#F5F0E8] px-5 pt-16 sm:px-8 sm:pt-24 lg:gap-[56px] lg:px-20 lg:pt-[140px]">
        <div className="flex w-full max-w-[647px] flex-col items-center gap-3 text-center sm:gap-4">
          <p className="font-schibsted-grotesk text-xs font-semibold uppercase leading-normal text-[#A38F75] sm:text-base">
            Chapter
          </p>

          <h1 className="w-full font-eb-garamond text-[clamp(4.5rem,22vw,220px)] font-normal leading-[80%] text-[#2C2A26]">
            Varro
          </h1>

          <p className="max-w-[320px] font-inter text-base font-normal leading-[150%] text-[#4A4844]/80 sm:max-w-none sm:text-[clamp(1.125rem,2.5vw,24px)] sm:leading-normal">
            A passage through the unrecorded tides of the northern straits.
          </p>
        </div>

        {/* Mobile-only divider under intro */}
        <div className="mt-10 h-px w-16 bg-[#D9D7D2] sm:mt-14 lg:hidden" />
      </section>

      {/* Hero image + mission copy */}
      <section className="flex flex-col items-center bg-[#F5F0E8] pb-10 pt-8 sm:gap-12 sm:px-8 sm:pb-5 sm:pt-12 lg:gap-16 lg:px-20 lg:pb-[19px] lg:pt-[53px]">
        <div className="flex w-full max-w-[1568px] flex-col items-center gap-8 sm:gap-12 lg:gap-[62px]">
          {/* Full-bleed on mobile, padded + rounded on desktop */}
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[1568/470] sm:rounded-xl lg:px-0">
            <Image
              src="/Varro/Hero1.png"
              alt="Varro command console with multi-screen intelligence displays"
              fill
              className="object-cover object-[center_42%]"
              priority
              sizes="(max-width: 1568px) 100vw, 1568px"
            />
          </div>

          <div className="flex max-w-[900px] flex-col items-center gap-4 px-5 text-center sm:gap-6 sm:px-0 lg:gap-[35px]">
            <p className="font-schibsted-grotesk text-[10px] font-semibold uppercase leading-normal tracking-[0.04em] text-[#A38F75] sm:text-xs">
              Mission designation: Varro Collection
            </p>

            <h2 className="font-eb-garamond text-[clamp(2.25rem,11vw,113px)] font-normal leading-[85%] text-[#2C2A26]">
              A NATION&apos;S
              <br className="lg:hidden" /> OWN EYES.
            </h2>

            <p className="max-w-[280px] font-inter text-base font-normal leading-normal text-[#4A4844]/80 sm:max-w-[322px] sm:text-lg lg:text-xl">
              Awake when the country sleeps.
            </p>
          </div>
        </div>

        <div className="mt-8 h-px w-16 bg-[#D9D7D2] sm:mt-0 sm:w-full sm:max-w-[405px]" />
      </section>
    </>
  );
}
