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
    <section className="relative w-full overflow-hidden bg-[#121416]">
      <video
        className="absolute inset-0 size-full object-cover object-[center_45%] opacity-70"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Home/moving flowing bg video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#0E121A]/50" aria-hidden="true" />

      <div className={`${HOME_CONTENT_SHELL} relative z-10 pt-8 sm:pt-10 lg:pt-12`}>
        <p className="font-eb-garamond text-xl font-bold uppercase leading-normal text-[#C6A02C] sm:text-2xl">
          Capabilities
        </p>

        <h2 className="mt-4 font-eb-garamond text-[clamp(2.1rem,4vw,64px)] font-medium leading-[90%] text-white">
          Precision statecraft{" "}
          <span className="font-semibold italic">at scale.</span>
        </h2>

        <div className="mt-4 h-px w-full bg-white" />

        <div className="mt-[3.78rem] mb-[3.78rem] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-[5.04rem] lg:mb-[5.04rem] lg:grid-cols-3 lg:gap-5">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col items-start gap-3 bg-white p-5 sm:p-6 lg:p-7"
            >
              <h3 className="font-eb-garamond text-2xl font-medium italic leading-[105%] text-[#111] sm:text-[28px]">
                {card.title}
              </h3>
              <p className="font-inter text-sm font-normal leading-[160%] text-[#6B665F] sm:text-base">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
