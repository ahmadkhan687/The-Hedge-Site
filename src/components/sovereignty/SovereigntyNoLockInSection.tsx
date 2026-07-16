import Image from "next/image";

const cards = [
  {
    title: "No Outside Switch",
    body: "No single-vendor dependency. As better tools emerge, you adopt them, always on your own terms.",
  },
  {
    title: "Sovereign Architecture",
    body: "Designed for jurisdictions where data privacy isn't a policy, it's the physical reality.",
  },
  {
    title: "Deep Capability",
    body: "We don't just ship software. We train the teams that will maintain your digital borders for the next decade.",
  },
];

export default function SovereigntyNoLockInSection() {
  return (
    <section className="bg-[#F4F0EA] px-5 py-14 sm:px-8 lg:px-[120px] lg:py-[140px]">
      {/* —— Mobile layout: quote + headline —— */}
      <div className="mx-auto flex w-full max-w-[1488px] flex-col items-center gap-10 lg:hidden">
        <blockquote className="w-full border border-[#B8B4AC] bg-white px-6 py-8 text-center font-inter text-base font-normal italic leading-[1.6] text-[#808080]">
          &ldquo;We build toward our exit. You keep everything.&rdquo;
        </blockquote>

        <h2 className="text-center font-eb-garamond text-[clamp(2.25rem,9vw,2.75rem)] font-medium leading-[1.12] text-[#111]">
          Sovereignty is not a
          <br />
          feature. It is the
          <br />
          <span className="bg-[#D7A92C] px-2 text-[#F4F0EA]">design.</span>
        </h2>
      </div>

      {/* —— Desktop content —— */}
      <div className="mx-auto hidden w-full max-w-[1488px] grid-cols-2 gap-16 lg:grid">
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="font-inter text-base font-extrabold uppercase text-[#C6A02C]">
              No lock in
            </p>
            <h2 className="font-eb-garamond text-[clamp(1.75rem,3.5vw,36px)] font-medium leading-normal text-[#111]">
              When we leave, the sight
              <br />
              stays.
            </h2>
            <p className="font-inter text-base font-normal leading-[1.6] text-[#6B665F]">
              Your infrastructure, your data, your people, built to outlast any
              vendor and any platform. Sovereignty isn&apos;t an add-on.
              It&apos;s the architecture of everything we do.
            </p>
          </div>

          <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px] lg:h-[400px]">
            <Image
              src="/Sovereignity/three.png"
              alt="Sovereign capability equipment and tools"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 675px"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:mt-0">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-4 border border-[#111]/10 px-6 py-4 sm:px-8"
            >
              <div className="flex items-center gap-3">
                <span className="size-2.5 shrink-0 rounded-sm bg-[#C6A02C]" />
                <p className="font-eb-garamond text-xl font-medium uppercase text-[#111]">
                  {card.title}
                </p>
              </div>
              <p className="font-inter text-base font-normal leading-[1.6] text-[#6B665F]">
                {card.body}
              </p>
            </div>
          ))}

          <blockquote className="hidden border border-[#808080] p-6 font-inter text-base font-normal italic uppercase leading-[23px] tracking-[0.96px] text-[#808080] lg:block">
            &ldquo;We build toward our exit. When engagement ends, you keep the
            system, data, methods, and trained people.&rdquo;
          </blockquote>
        </div>
      </div>

      <div className="mx-auto mt-20 hidden w-full max-w-[1488px] justify-center px-5 sm:px-8 lg:mt-24 lg:flex lg:px-0">
        <p className="text-center font-eb-garamond text-[clamp(2rem,5vw,68px)] font-medium leading-[1.1] text-[#111]">
          Sovereignty is not a feature. It is the{" "}
          <span className="bg-[#D7A92C] px-2 text-[#F4F0EA]">design.</span>
        </p>
      </div>
    </section>
  );
}
