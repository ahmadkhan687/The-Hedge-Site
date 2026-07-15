import Image from "next/image";

export default function SovereigntyCapabilitySection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-12 lg:gap-20">
        <div className="flex max-w-[1140px] flex-col gap-8">
          <p className="font-inter text-base font-extrabold uppercase text-[#C6A02C]">
            Our approach
          </p>
          <h2 className="font-eb-garamond text-[clamp(2rem,4vw,56px)] font-medium leading-[1.2] text-[#111]">
            Capability you own. Not capability you rent.
          </h2>
          <p className="max-w-[800px] font-inter text-lg font-normal leading-[1.6] text-[#6B665F] sm:text-[22px]">
            Model-agnostic by design. We build toward our own exit. When the
            engagement ends, you walk away with the system, the data, the
            methods, and the people trained to run it.
          </p>
        </div>

        <div className="relative aspect-[1728/868] w-full overflow-hidden">
          <Image
            src="/images/sovereignty/map.jpg"
            alt="Tactical map visualization of sovereign coverage regions"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1488px) 100vw, 1488px"
          />
        </div>
      </div>
    </section>
  );
}
