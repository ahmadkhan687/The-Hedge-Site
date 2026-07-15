const audiences = [
  {
    number: "01",
    title: "Nation-State Governments",
    body: "Ministries, departments, and agencies building sovereign capability across policy, operations, and delivery.",
  },
  {
    number: "02",
    title: "Defense Institutions",
    body: "Defense organizations and security agencies modernizing planning, readiness, and operational decision-making.",
  },
  {
    number: "03",
    title: "Critical Infrastructure",
    body: "Operators of critical infrastructure and essential services strengthening resilience and strategic preparedness.",
  },
];

export default function RequestAccessAudienceSection() {
  return (
    <section className="bg-[#F4F0EA] px-5 pb-20 pt-8 sm:px-8 lg:px-[120px] lg:pb-32 lg:pt-16">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col items-center gap-12">
        <p className="font-inter text-sm font-extrabold uppercase text-[#D7A92C]">
          Who it is for
        </p>

        <h2 className="max-w-[996px] text-center font-eb-garamond text-[clamp(2rem,5vw,72px)] font-medium leading-[1.1] text-[#111]">
          For governments and institutions building sovereign capability.
        </h2>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {audiences.map((audience) => (
            <div
              key={audience.number}
              className="flex flex-col gap-3 rounded-2xl border-t border-[#111]/10 px-6 pb-6 pt-5"
            >
              <p className="font-eb-garamond text-sm font-semibold text-[#111]">
                {audience.number}
              </p>
              <p className="font-eb-garamond text-xl font-semibold leading-[1.2] text-[#111]">
                {audience.title}
              </p>
              <p className="font-inter text-sm font-normal leading-[1.6] text-[#111]">
                {audience.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
