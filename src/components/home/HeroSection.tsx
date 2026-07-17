import ColorBars from "@/components/home/ColorBars";
import HeroGlobe from "@/components/home/HeroGlobe";
import ScrollDownButton from "@/components/home/ScrollDownButton";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";
import { CharReveal, FadeUp, MotionCTA } from "@/components/ui/text-reveal";

function ArrowIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M2.4996 6H9.5004M6 9.5004L9.5004 6L6 2.4996"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#F4F0EA] pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-[84px] xl:pb-20 2xl:pb-24">
      <div
        className={`${HOME_CONTENT_SHELL} grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-8 xl:gap-10 2xl:grid-cols-[730px_auto] 2xl:gap-12`}
      >
        <div className="relative z-10 max-w-[580px] lg:max-w-[480px] lg:pt-6 xl:max-w-[560px] 2xl:max-w-[730px] 2xl:pt-[126px]">
          <p className="font-archivo-narrow text-xs font-semibold uppercase leading-normal text-[#6B665F] sm:text-sm lg:text-base">
            STRATEGIC PRODUCTS / INTELLIGENCE / DELIVERY
          </p>

          <CharReveal
            as="h1"
            className="mt-3 font-eb-garamond text-[clamp(2.75rem,12vw,7.5rem)] font-normal leading-[0.9] text-[#111] sm:mt-5 lg:text-[clamp(2.25rem,4vw,3.5rem)] xl:text-[clamp(2.75rem,4.5vw,4.5rem)] 2xl:text-[clamp(4rem,6vw,7.5rem)]"
            segments={[{ text: "Systems for\nserious\noutcomes." }]}
          />

          <FadeUp
            as="p"
            className="mt-5 max-w-[620px] font-eb-garamond text-[clamp(1.0625rem,3.2vw,1.625rem)] font-normal leading-[155%] text-[#272521] sm:mt-[30px] lg:text-lg xl:text-xl 2xl:text-[clamp(1.0625rem,3vw,1.625rem)]"
            delay={0.35}
          >
            We monitor the entire field to deliver answers before the country
            forms the question.
            <br />
            <span className="font-semibold italic">
              Sovereign intelligence, operated by a sovereign state.
            </span>
          </FadeUp>
        </div>

        <div className="flex min-w-0 max-w-full flex-col items-center lg:items-end lg:justify-self-end">
          <div className="relative aspect-square w-[min(100%,clamp(280px,82vw,400px))] shrink-0 overflow-hidden sm:w-[min(100%,clamp(320px,58vw,460px))] lg:ml-auto lg:w-[min(calc(100vw-580px),560px)] xl:w-[min(calc(100vw-680px),720px)] 2xl:w-[min(calc(100vw-918px),1092px)]">
            <div className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.92)_0%,rgba(244,240,234,0.4)_48%,transparent_70%)]" />
            <HeroGlobe />
          </div>

          {/* Desktop: color bars + scroll down (right-aligned) */}
          <div className="mt-4 hidden w-full max-w-[240px] flex-col items-end gap-5 self-end sm:gap-6 lg:flex 2xl:mt-[42px] 2xl:gap-7">
            <ColorBars />
            <ScrollDownButton />
          </div>
        </div>
      </div>

      {/* Mobile-only: color bars + operating model copy + text CTAs */}
      <div className={`${HOME_CONTENT_SHELL} mt-8 flex flex-col gap-6 lg:hidden`}>
        <div className="flex items-center gap-[5px]" aria-hidden="true">
          <span className="h-[10px] w-9 bg-[#E83387]" />
          <span className="h-[10px] w-9 bg-[#F08A22]" />
          <span className="h-[10px] w-9 bg-[#D7A92C]" />
          <span className="h-[10px] w-9 bg-[#23B6D2]" />
        </div>

        <p className="font-eb-garamond text-[clamp(1.25rem,5vw,1.75rem)] font-medium leading-[120%] text-[#111]">
          One mind reads the whole field. The analysis, the attribution, the
          answer, before the country has formed the question.
        </p>

        <div className="flex flex-col items-start gap-4">
          <MotionCTA
            href="/request-access"
            className="inline-flex w-fit items-center gap-2 font-inter text-sm font-extrabold uppercase leading-normal text-[#111] no-underline transition-opacity hover:opacity-70"
          >
            Request a <span className="text-[#E83387]">Briefing</span>
            <ArrowIcon />
          </MotionCTA>

          <MotionCTA
            href="/domains"
            className="inline-flex w-fit items-center gap-2 font-inter text-sm font-extrabold uppercase leading-normal text-[#111] no-underline transition-opacity hover:opacity-70"
          >
            Read <span className="text-[#D7A92C]">Technical Thesis</span>
            <ArrowIcon />
          </MotionCTA>
        </div>
      </div>
    </section>
  );
}
