import ColorBars from "@/components/home/ColorBars";
import ScrollDownButton from "@/components/home/ScrollDownButton";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";
import { Globe } from "@/components/ui/globe";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#F4F0EA] pb-8 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-[84px] xl:pb-20 2xl:pb-24">
      <div
        className={`${HOME_CONTENT_SHELL} grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-8 xl:gap-10 2xl:grid-cols-[730px_auto] 2xl:gap-12`}
      >
        <div className="relative z-10 max-w-[580px] lg:max-w-[480px] lg:pt-6 xl:max-w-[560px] 2xl:max-w-[730px] 2xl:pt-[126px]">
          <p className="font-archivo-narrow text-sm font-semibold uppercase leading-normal text-[#6B665F] sm:text-base">
            STRATEGIC PRODUCTS / INTELLIGENCE / DELIVERY
          </p>

          <h1 className="mt-4 font-eb-garamond text-[clamp(2.75rem,11vw,7.5rem)] font-normal leading-[0.9] text-[#111] sm:mt-5 lg:text-[clamp(2.25rem,4vw,3.5rem)] xl:text-[clamp(2.75rem,4.5vw,4.5rem)] 2xl:text-[clamp(4rem,6vw,7.5rem)]">
            Systems for
            <br />
            serious
            <br />
            outcomes.
          </h1>

          <p className="mt-6 max-w-[620px] font-eb-garamond text-[clamp(1.0625rem,3vw,1.625rem)] font-normal leading-[155%] text-[#272521] sm:mt-[30px] lg:text-lg xl:text-xl 2xl:text-[clamp(1.0625rem,3vw,1.625rem)]">
            We monitor the entire field to deliver answers before the country
            forms the question.
            <br />
            <span className="font-semibold italic">
              Sovereign intelligence, operated by a sovereign state.
            </span>
          </p>
        </div>

        <div className="flex min-w-0 max-w-full flex-col items-center justify-self-center sm:items-end sm:justify-self-end">
          <div className="relative mx-auto aspect-square w-[min(100%,clamp(300px,80vw,420px))] shrink-0 overflow-hidden sm:ml-auto sm:mr-0 sm:w-[min(100%,clamp(320px,58vw,460px))] lg:w-[min(calc(100vw-580px),560px)] xl:w-[min(calc(100vw-680px),720px)] 2xl:w-[min(calc(100vw-918px),1092px)]">
            <div className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.92)_0%,rgba(244,240,234,0.4)_48%,transparent_70%)]" />
            <Globe />
          </div>

          <div className="mt-4 flex w-full max-w-[240px] flex-col items-end gap-5 self-end sm:gap-6 2xl:mt-[42px] 2xl:gap-7">
            <ColorBars />
            <ScrollDownButton />
          </div>
        </div>
      </div>
    </section>
  );
}
