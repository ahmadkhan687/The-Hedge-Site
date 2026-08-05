import Image from "next/image";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export default function AboutStrategicIntentSection() {
  return (
    <section className="relative overflow-hidden">
      <TrackedLink
        href="/request-access"
        event="request_access_click"
        eventParams={{ location: "about_strategic_intent" }}
        aria-label="Request a briefing"
        className="relative flex min-h-[400px] items-center justify-center px-5 py-20 text-inherit no-underline transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#C6A02C] sm:px-8 lg:min-h-[501px] lg:px-[120px]"
      >
        <div className="absolute inset-0 bg-[#121416]" />
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <Image
            src="/About/image%20632_2.webp"
            alt=""
            fill
            className="object-cover object-top blur-[2px]"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 flex max-w-[720px] flex-col items-center gap-6 text-center">
          <p className="font-inter text-sm font-medium uppercase text-[#C6A02C]">
            Strategic Intent
          </p>

          <h2 className="font-eb-garamond text-[clamp(2rem,5vw,64px)] font-bold italic leading-normal text-white">
            We build for the person who makes{" "}
            <span className="font-extrabold not-italic">the call.</span>
          </h2>

          <p className="font-inter text-lg font-normal leading-[1.6] text-[#F4F0EA]">
            The most important judgement in a country still belongs to a person,
            not a machine. We build the room it happens in.
          </p>
        </div>
      </TrackedLink>
    </section>
  );
}
