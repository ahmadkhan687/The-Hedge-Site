const moves = [
  {
    number: "01 . Detect",
    title: "Catch it while it is small.",
    body: "The agents flag the claim, the account, the clip as it starts to move.",
  },
  {
    number: "02 . Decode",
    title: "Name who is behind it.",
    body: "Maps the accounts, the timing, the money. Tells real from fake.",
  },
  {
    number: "03 . Decide",
    title: "The verdict, on one page.",
    body: "What is true, how far it has spread, the cost of waiting.",
  },
  {
    number: "04 . Deploy",
    title: "The response, in your hands.",
    body: "Options, ranked. You choose. Nothing acts on its own.",
  },
  {
    number: "05 . Deepen",
    title: "Sharper with every pass.",
    body: "The case joins the memory. The next one is caught faster.",
  },
];

export default function VarroFiveMovesSection() {
  return (
    <section className="bg-[#080810] px-5 py-16 sm:px-8 lg:px-[88px] lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1568px] flex-col gap-12 lg:gap-[72px]">
        <div className="flex flex-col gap-4">
          <p className="font-archivo-narrow text-[10px] font-normal uppercase tracking-[2px] text-[#C6A02C]">
            04 . The discipline
          </p>
          <h2 className="max-w-[700px] font-eb-garamond text-[clamp(2rem,5vw,54px)] font-medium leading-[1.1] tracking-[-0.66px] text-white">
            Five moves. The same against any threat.
          </h2>
        </div>

        <div className="flex flex-col">
          {moves.map((move, index) => (
            <div
              key={move.number}
              className={`flex flex-col gap-4 border-[#C6A02C]/[0.28] border-t py-8 sm:flex-row sm:gap-8 sm:py-10 ${
                index === moves.length - 1 ? "border-b" : ""
              }`}
            >
              <p className="w-full shrink-0 font-archivo-narrow text-[11px] font-normal uppercase tracking-[1.5px] text-[#C6A02C] sm:w-[134px]">
                {move.number}
              </p>
              <div className="flex flex-col gap-4">
                <h3 className="font-eb-garamond text-[26px] font-normal leading-[1.15] text-white">
                  {move.title}
                </h3>
                <p className="font-inter text-lg font-normal leading-[1.7] text-[#AAB2C6] lg:text-xl">
                  {move.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
