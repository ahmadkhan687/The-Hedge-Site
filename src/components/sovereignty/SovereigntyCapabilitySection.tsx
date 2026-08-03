import Image from "next/image";
import Link from "next/link";
import { FadeUp, WordReveal } from "@/components/ui/text-reveal";

const linkFocus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A02C]";

export default function SovereigntyCapabilitySection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-12 lg:gap-20">
        <div className="flex max-w-[1140px] flex-col gap-8">
          <Link
            href="/about"
            className={`w-fit font-inter text-base font-extrabold uppercase text-[#C6A02C] no-underline underline-offset-4 transition-opacity hover:underline hover:opacity-70 ${linkFocus}`}
          >
            You own the data
          </Link>
          <WordReveal
            as="h2"
            className="font-eb-garamond text-[clamp(2rem,4vw,56px)] font-medium leading-[1.2] text-[#111]"
            segments={[
              { text: "Capability you own. Not capability you rent." },
            ]}
          />
          <FadeUp
            as="p"
            className="max-w-[800px] font-inter text-lg font-normal leading-[1.6] text-[#6B665F] sm:text-[22px]"
            delay={0.2}
          >
            Model-agnostic by design. We build toward our own exit. When the
            engagement ends, you walk away with the system, the data, the
            methods, and the people trained to run it.
          </FadeUp>
        </div>

        <div className="relative aspect-[1728/868] w-full overflow-hidden">
          <Image
            src="/Sovereignity/two.webp"
            alt="Sovereign capability overview"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1488px) 100vw, 1488px"
          />
        </div>
      </div>
    </section>
  );
}
