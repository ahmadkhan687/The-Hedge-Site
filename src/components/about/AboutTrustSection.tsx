const principles = [
  {
    number: "01",
    title: "No Named Clients",
    body: "Discretion is our primary product. No institution we serve appears on this site, nor will they ever. Our loyalty is absolute.",
  },
  {
    number: "02",
    title: "Immutable Handover",
    body: "We will not build what we cannot hand over. If your state cannot own the source and the hardware, we do not sell it.",
  },
  {
    number: "03",
    title: "Absolute Control",
    body: "We keep no switches we would not give you. The off button is always in your hand, not ours. Independence is non-negotiable.",
  },
];

export default function AboutTrustSection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-12 lg:gap-20">
        <div className="flex flex-col gap-8">
          <p className="font-inter text-sm font-medium uppercase text-[#C6A02C]">
            What we will not do
          </p>
          <h2 className="max-w-[1000px] font-eb-garamond text-[clamp(2.25rem,5vw,64px)] font-normal leading-normal text-[#111]">
            The costs we pay to stay trusted.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-[60px]">
          {principles.map((principle) => (
            <div key={principle.number} className="flex flex-col gap-6">
              <p className="font-eb-garamond text-[48px] font-normal leading-normal text-[#C6A02C]">
                {principle.number}
              </p>
              <div className="flex flex-col gap-3">
                <p className="font-eb-garamond text-xl font-bold text-[#111]">
                  {principle.title}
                </p>
                <p className="font-inter text-base font-normal leading-[1.6] text-[#6B665F]">
                  {principle.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
