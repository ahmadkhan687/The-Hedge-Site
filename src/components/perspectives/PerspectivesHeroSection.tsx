export default function PerspectivesHeroSection() {
  return (
    <section className="relative z-10 px-5 pb-16 pt-24 text-center sm:px-8 lg:px-[120px] lg:pb-24 lg:pt-[140px]">
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center gap-8">
        <h1 className="font-eb-garamond text-[clamp(2.75rem,8vw,112px)] font-medium leading-[1.05] text-[#111]">
          Silent on the work.
          <br />
          Loud on the thinking.
        </h1>

        <p className="font-inter text-base font-normal uppercase text-[#111]/80">
          The Hedge Collective
        </p>

        <p className="max-w-[560px] font-inter text-base font-normal leading-[1.6] text-[#111]/70">
          We never show whose problem we solved. We show how we think. Judge the
          mind before you trust the hand.
        </p>
      </div>
    </section>
  );
}
