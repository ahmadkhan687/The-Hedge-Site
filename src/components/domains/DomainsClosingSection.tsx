import Image from "next/image";
import { Char3DReveal, MotionCTA } from "@/components/ui/text-reveal";

export default function DomainsClosingSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A10]">
      {/* —— Mobile layout —— */}
      <div className="relative flex min-h-[520px] flex-col justify-center px-5 py-20 sm:px-8 lg:hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="/Domains/Earth_revolving_from_space_1080p_202607071448.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/82" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[420px] flex-col gap-8">
          <p className="font-barlow-condensed text-xs font-extrabold uppercase tracking-[0.1em] text-[#D7A92C]">
            Domain
          </p>

          <Char3DReveal
            as="h2"
            className="text-center font-eb-garamond text-[clamp(2.25rem,9vw,2.75rem)] font-medium leading-[1.12] text-[#F4F0EA]"
            segments={[{ text: "A nation that sees for itself, governs itself." }]}
          />

          <div className="h-px w-full bg-[#F4F0EA]/15" />

          <p className="text-center font-barlow-condensed text-[20px] font-extrabold uppercase tracking-[0.1em] text-[#D7A92C]">
            Varro · The Hedge Collective
          </p>

          <MotionCTA
            href="/request-access"
            tapScale={0.95}
            className="flex min-h-[52px] w-full items-center justify-center bg-[#C6A02C] font-inter text-sm font-extrabold uppercase leading-normal tracking-[0.06em] text-white no-underline transition-opacity hover:opacity-85"
          >
            Request Briefing
          </MotionCTA>
        </div>
      </div>

      {/* —— Desktop layout —— */}
      <div className="relative hidden flex-col items-center gap-10 overflow-hidden px-5 py-24 sm:px-8 lg:flex lg:gap-[72px] lg:px-[120px] lg:py-40">
        <Image
          src="/Domains/IMAGES HEDGE WEB-AI REMOVAL (1).webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/86" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.06] to-transparent" />

        <p className="relative z-10 font-barlow-condensed text-[16px] font-extrabold uppercase text-[#D7A92C]">
          Domain
        </p>

        <Char3DReveal
          as="h2"
          className="relative z-10 max-w-[1233px] text-center font-eb-garamond text-[clamp(2.5rem,7vw,96px)] font-medium leading-[1.1] text-[#F4F0EA]"
          segments={[{ text: "A nation that sees for itself, governs itself." }]}
        />

        <div className="relative z-10 h-px w-full max-w-[480px] bg-[#F4F0EA]/20" />

        <p className="relative z-10 font-barlow-condensed text-[20px] font-extrabold uppercase text-[#D7A92C]">
          Varro · The Hedge Collective
        </p>
      </div>

      {/* Mobile gap between closing image and footer */}
      <div className="h-8 w-full bg-[#F4F0EA] lg:hidden" aria-hidden />
    </section>
  );
}
