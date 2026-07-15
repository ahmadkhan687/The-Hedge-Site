import Image from "next/image";

const features = [
  "Model-agnostic by design.",
  "No single-vendor dependency. As better tools emerge, you adopt them, always on your own terms.",
  "Sovereignty isn't an add-on. It's the architecture.",
];

export default function SovereigntyJurisdictionSection() {
  return (
    <section className="border border-[#111] px-5 py-12 sm:px-8 lg:px-[82px] lg:py-[125px]">
      <div className="mx-auto grid w-full max-w-[1488px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="relative h-[360px] w-full overflow-hidden sm:h-[480px] lg:h-[594px] lg:max-w-[642px]">
            <Image
              src="/Sovereignity/split.png"
              alt="Sovereign infrastructure hardware in a minimalist setting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 642px"
            />
          </div>

          <div className="flex justify-center lg:justify-start">
            <span className="inline-flex h-7 items-center border border-[#111] px-4 font-inter text-base font-extrabold uppercase text-[#111]">
              Full Ownership
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:pt-0">
          <div className="flex flex-col gap-8">
            <p className="font-inter text-base font-extrabold uppercase text-[#C6A02C]">
              Your Jurisdiction
            </p>
            <h2 className="font-eb-garamond text-[clamp(2rem,4vw,56px)] font-medium leading-[1.2] text-[#111]">
              Inside your borders. On your terms.
            </h2>
            <p className="font-inter text-lg font-normal leading-[1.6] text-[#6B665F] sm:text-[22px]">
              It runs on your soil. Your data never leaves your soil, or your
              law. No foreign entity stands between you and your own
              intelligence.
            </p>
          </div>

          <div className="flex flex-col gap-6 border border-[#111] bg-white p-6">
            <div className="flex flex-col gap-3">
              <p className="font-eb-garamond text-[28px] font-medium text-[#111]">
                Our Approach
              </p>
              <p className="font-inter text-base font-normal leading-6 text-[#6B665F]">
                Capability transfer is the only deliverable that matters.
              </p>
            </div>

            <div className="h-px w-full bg-[#111]/[0.08]" />

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="size-1.5 shrink-0 rounded-sm bg-[#C6A02C]" />
                <p className="font-inter text-base font-extrabold uppercase tracking-[0.96px] text-[#C6A02C]">
                  Your command
                </p>
              </div>
              <p className="font-eb-garamond text-2xl font-medium leading-[30px] text-[#111]">
                Full ownership. No dependency.
              </p>
              <p className="font-inter text-base font-normal leading-6 text-[#6B665F]">
                Your infrastructure, your data, your people, built to outlast any
                vendor and any platform.
              </p>
            </div>

            <div className="h-px w-full bg-[#111]/[0.08]" />

            <div className="flex flex-col gap-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-sm bg-[#C6A02C]" />
                  <p className="font-inter text-base font-normal leading-6 text-[#111]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 border-b border-[#111] pb-5">
              <p className="font-inter text-base font-extrabold uppercase tracking-[0.96px] text-[#C6A02C]">
                No lock-in
              </p>
              <p className="font-eb-garamond text-lg font-normal leading-[26px] text-[#111]">
                When we leave, the capability stays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
