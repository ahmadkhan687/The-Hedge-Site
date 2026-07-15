const articles = [
  {
    number: "01",
    title: "Why a kill switch is a foreign policy",
    subtitle: "Who holds the off switch holds the country.",
  },
  {
    number: "02",
    title: "The cost of borrowed sight",
    subtitle: "What a state loses when its eyes belong to someone else.",
  },
  {
    number: "03",
    title: "Catching a lie in four hours",
    subtitle: "Why speed, not volume, decides a narrative war.",
  },
  {
    number: "04",
    title: "The verdict stays human.",
    subtitle: "A quiet principle for sovereign decision-making.",
  },
];

export default function PerspectivesRecentPiecesSection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:py-24">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-12">
        <div className="h-px w-full bg-[#111]/[0.08]" />

        <div className="flex max-w-[1140px] flex-col gap-8">
          <p className="font-inter text-base font-extrabold uppercase text-[#C6A02C]">
            Recent | Thinking
          </p>
          <h2 className="font-eb-garamond text-[clamp(2rem,4vw,56px)] font-medium leading-[1.2] text-[#111]">
            Recent pieces.
          </h2>
          <p className="max-w-[800px] font-inter text-lg font-normal leading-[1.6] text-[#6B665F] sm:text-[22px]">
            We never show whose problem we solved. We show how we think. Judge
            the mind before you trust the hand.
          </p>
        </div>

        <div className="flex flex-col">
          {articles.map((article, index) => (
            <div key={article.number}>
              <div className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-[80px_1fr_420px] sm:items-start sm:gap-6">
                <p className="font-eb-garamond text-xl font-medium text-[#C6A02C]">
                  {article.number}
                </p>
                <p className="font-eb-garamond text-2xl font-medium leading-[1.3] text-[#111]">
                  {article.title}
                </p>
                <p className="font-inter text-base font-normal leading-[1.6] text-[#6B665F] sm:max-w-[420px]">
                  {article.subtitle}
                </p>
              </div>
              {index < articles.length - 1 && (
                <div className="h-px w-full bg-[#111]/[0.08]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
