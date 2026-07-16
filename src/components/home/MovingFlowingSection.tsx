import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";

const cards = [
  {
    title: "Know first.",
    description:
      "You catch coordination while it is still small enough to stop, not after the damage is measured.",
  },
  {
    title: "< 2 sec",
    description:
      "The alert beats the crisis. When something crosses the line, it is in your hand, anywhere, in under two seconds.",
  },
  {
    title: "Answer before it lands.",
    description:
      "A lie met in four hours has not yet become the truth. Your reply is out before the narrative sets.",
  },
  {
    title: "One room. A nation's reach.",
    description:
      "The mind does the watching that once took a hundred analysts. Your people make the calls that matter.",
  },
  {
    title: "Owe no one abroad.",
    description:
      "Your eyes are your own. No foreign switch. No one between you and your own picture.",
  },
  {
    title: "Keep the decision.",
    description:
      "The machine brings the verdict. You make the call, and you keep the credit and the counsel.",
  },
];

export default function MovingFlowingSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black lg:bg-[#121416]">
      {/* Desktop only: video background */}
      <video
        className="absolute inset-0 hidden size-full object-cover object-[center_45%] opacity-70 lg:block"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Home/moving flowing bg video.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 hidden bg-[#0E121A]/50 lg:block"
        aria-hidden="true"
      />

      <div
        className={`${HOME_CONTENT_SHELL} relative z-10 py-10 lg:py-0 lg:pt-12`}
      >
        <p className="font-inter text-xs font-extrabold uppercase tracking-[0.08em] text-[#A8A8A8] lg:font-eb-garamond lg:text-2xl lg:font-bold lg:tracking-normal lg:text-[#C6A02C]">
          Capabilities
        </p>

        {/* Mobile-only color bars */}
        <div
          className="mt-3 flex items-center gap-[5px] lg:hidden"
          aria-hidden="true"
        >
          <span className="h-[10px] w-9 bg-[#E83387]" />
          <span className="h-[10px] w-9 bg-[#F08A22]" />
          <span className="h-[10px] w-9 bg-[#D7A92C]" />
          <span className="h-[10px] w-9 bg-[#23B6D2]" />
        </div>

        <h2 className="mt-5 font-eb-garamond text-[clamp(1.875rem,7vw,64px)] font-medium leading-[1.05] text-white lg:mt-4 lg:leading-[90%]">
          Precision statecraft{" "}
          <span className="font-semibold italic">at scale.</span>
        </h2>

        {/* Desktop-only white rule */}
        <div className="mt-4 hidden h-px w-full bg-white lg:block" />

        {/* Mobile: 1-col dark cards · Desktop: 3-col white cards */}
        <div className="mt-8 grid grid-cols-1 gap-3 lg:mb-[5.04rem] lg:mt-[5.04rem] lg:grid-cols-3 lg:gap-5">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col items-start gap-2 rounded-md border border-white/10 bg-[#1A1A1A] p-5 lg:gap-3 lg:rounded-none lg:border-0 lg:bg-white lg:p-7"
            >
              <h3 className="font-eb-garamond text-xl font-semibold leading-[105%] text-white lg:text-[28px] lg:font-medium lg:italic lg:text-[#111]">
                {card.title}
              </h3>
              <p className="font-inter text-sm font-normal leading-[160%] text-[#A8A8A8] lg:text-base lg:text-[#6B665F]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
