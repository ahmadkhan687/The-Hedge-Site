import Link from "next/link";

const cards = [
  {
    label: "• Clarity",
    title: "See the Whole Board.",
    body: "Strip away noise and surface only what matters. A clear picture of reality is the first act of sovereign thinking.",
  },
  {
    label: "• Decision",
    title: "Make the Call.",
    body: "Indecision is a decision. The doctrine provides a repeatable framework for committing with confidence, even under pressure.",
  },
  {
    label: "• Continuity",
    title: "Hold the Line.",
    body: "A decision without follow through is noise. This is the method for executing, adapting, and staying the course when it matters most.",
  },
];

export default function PerspectivesDoctrineSection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-12 lg:gap-16">
        <p className="font-inter text-base font-extrabold uppercase text-[#C6A02C]">
          The doctrine
        </p>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="max-w-[960px] font-eb-garamond text-[clamp(2rem,4vw,56px)] font-medium leading-[1.2] text-[#111]">
              The Sovereign Decision
              <br />
              Architecture.
            </h2>
            <p className="max-w-[960px] font-inter text-lg font-normal leading-[1.6] text-[#6B665F] sm:text-[22px]">
              The method, written down in full. How a nation should see, decide,
              and keep the call.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 rounded-xl border border-[#111]/[0.08] bg-white p-6"
              >
                <p className="font-inter text-base font-extrabold uppercase tracking-[0.96px] text-[#C6A02C]">
                  {card.label}
                </p>
                <p className="font-eb-garamond text-[28px] font-medium leading-9 text-[#111]">
                  {card.title}
                </p>
                <p className="font-inter text-base font-normal leading-6 text-[#6B665F]">
                  {card.body}
                </p>
                <div className="mt-auto h-px w-full bg-[#111]/[0.08]" />
              </div>
            ))}
          </div>

          <Link
            href="/request-access"
            className="inline-flex w-fit items-center gap-3 border-b border-[#111] pb-1 font-inter text-base font-extrabold uppercase tracking-[0.96px] text-[#C6A02C] transition-opacity hover:opacity-70"
          >
            Read the doctrine
            <span className="font-eb-garamond text-lg font-normal text-[#111]">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
