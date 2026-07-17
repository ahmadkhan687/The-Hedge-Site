import Image from "next/image";

export default function AboutDisciplineSection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[120px]">
      <div className="mx-auto grid w-full max-w-[1488px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <p className="font-inter text-sm font-medium uppercase text-[#C6A02C]">
              The Discipline
            </p>
            <h2 className="font-eb-garamond text-[clamp(2rem,4vw,56px)] font-medium leading-[1.2] text-[#111]">
              What we build to.
            </h2>
          </div>

          <div className="flex flex-col gap-6 font-inter text-lg font-normal leading-[1.8] text-[#6B665F]">
            <p>
              In an era of borderless cloud dominance, national security requires
              physical and digital control. We provide the stack that ensures
              intelligence never leaves the sovereign boundary.
            </p>
            <p>
              We do not offer a service. We deliver an asset. Once installed, it
              is yours to operate, modify, and defend. No backdoors. No remote
              kill switches. No external dependencies.
            </p>
          </div>
        </div>

        <div className="relative h-[400px] w-full overflow-hidden sm:h-[520px] lg:h-[640px] lg:max-w-[704px]">
          <Image
            src="/About/Secondary-Image-v2.webp"
            alt="Aerial view of sovereign infrastructure facility"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 704px"
          />
        </div>
      </div>
    </section>
  );
}
