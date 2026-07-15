import Link from "next/link";

export default function PerspectivesCtaSection() {
  return (
    <section className="bg-[#111] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-24">
      <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-6 text-center">
        <h2 className="font-eb-garamond text-[clamp(2.5rem,5vw,64px)] font-medium leading-[1.1] text-white">
          Ready to move forward?
        </h2>

        <p className="font-inter text-lg font-normal leading-7 text-[#EAEAEA]">
          Request a briefing to discuss your requirements and how we can we can
          help.
        </p>

        <Link
          href="/request-access"
          className="inline-flex items-center gap-2.5 border-b border-white pb-0.5 font-inter text-base font-extrabold uppercase text-white transition-opacity hover:opacity-70"
        >
          Request a briefing
          <span className="font-eb-garamond text-xl font-normal">→</span>
        </Link>
      </div>
    </section>
  );
}
