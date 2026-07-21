import Image from "next/image";

const scales = [
  {
    label: "Grand",
    title: "A continent in hours.",
    body: "A state-run influence campaign across a region mapped and named before the polls open.",
  },
  {
    label: "Micro",
    title: "One actor nine days out.",
    body: "A single person moving toward an attack on critical infrastructure caught from open signals and intercepted before the act.",
  },
];

export default function DomainsScaleSection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-12 lg:gap-16">
        <p className="font-barlow-condensed text-[24px] font-extrabold uppercase text-[#C6A02C]">
          Every scale
        </p>

        <h2 className="max-w-[980px] font-eb-garamond text-[clamp(2.25rem,6vw,72px)] font-medium leading-normal text-[#111]">
          From a single person to a whole continent.
        </h2>

        <div className="relative hidden h-[280px] w-full overflow-hidden sm:h-[400px] lg:block lg:h-[510px]">
          <Image
            src="/Domains/points image.webp"
            alt="Scale visualization from individual to continental threat"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1488px) 100vw, 1488px"
          />
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-10">
          {scales.map((scale, index) => (
            <div
              key={scale.label}
              className={`flex flex-col gap-6 ${
                index === 0 ? "sm:border-r sm:border-[#1E2124]/20 sm:pr-10" : ""
              }`}
            >
              <p className="font-barlow-condensed text-[20px] font-extrabold uppercase text-[#C6A02C]">
                {scale.label}
              </p>
              <p className="font-eb-garamond text-[28px] font-medium italic leading-normal text-[#111]">
                {scale.title}
              </p>
              <p className="font-inter text-lg font-normal leading-[1.6] text-[#6B665F]">
                {scale.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
