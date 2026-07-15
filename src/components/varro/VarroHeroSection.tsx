import Image from "next/image";

export default function VarroHeroSection() {
  return (
    <>
      <section className="flex flex-col items-center gap-14 px-5 pt-24 sm:px-8 lg:gap-[56px] lg:px-20 lg:pt-[140px]">
        <div className="flex w-full max-w-[647px] flex-col items-center gap-4 text-center">
          <p className="font-schibsted-grotesk text-base font-semibold uppercase leading-normal text-[#A38F75]">
            Chapter
          </p>

          <h1 className="w-full font-eb-garamond text-[clamp(5rem,18vw,220px)] font-normal leading-[80%] text-[#2C2A26]">
            Varro
          </h1>

          <p className="font-inter text-[clamp(1.125rem,2.5vw,24px)] font-normal leading-normal text-[#4A4844]/80">
            A passage through the unrecorded tides of the northern straits.
          </p>
        </div>

   
      </section>

      <section className="flex flex-col items-center gap-12 px-5 pb-5 pt-12 sm:px-8 lg:gap-16 lg:px-20 lg:pb-[19px] lg:pt-[53px]">
        <div className="flex w-full max-w-[1568px] flex-col items-center gap-12 lg:gap-[62px]">
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ aspectRatio: "1568 / 470" }}
          >
            <Image
              src="/Varro/Hero1.png"
              alt="Varro command console with multi-screen intelligence displays"
              fill
              className="object-cover object-[center_42%]"
              priority
              sizes="(max-width: 1568px) 100vw, 1568px"
            />
          </div>

          <div className="flex max-w-[900px] flex-col items-center gap-6 text-center lg:gap-[35px]">
            <p className="font-schibsted-grotesk text-xs font-semibold uppercase leading-normal text-[#A38F75]">
              Mission designation: Varro Collection
            </p>

            <h2 className="font-eb-garamond text-[clamp(2.5rem,10vw,113px)] font-normal leading-[80%] text-[#2C2A26]">
              A NATION&apos;S OWN EYES.
            </h2>

            <p className="max-w-[322px] font-inter text-lg font-normal leading-normal text-[#4A4844]/80 lg:text-xl">
              Awake when the country sleeps.
            </p>
          </div>
        </div>

        <div className="h-px w-full max-w-[405px] bg-[#D9D7D2]" />
      </section>
    </>
  );
}
