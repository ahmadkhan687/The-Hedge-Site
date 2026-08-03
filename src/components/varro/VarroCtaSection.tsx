import Image from "next/image";
import { WordReveal } from "@/components/ui/text-reveal";

export default function VarroCtaSection() {
  return (
    <section className="relative flex min-h-[400px] flex-col items-center justify-center gap-8 overflow-hidden px-5 py-24 sm:px-8 lg:gap-10 lg:px-20 lg:pb-[100px] lg:pt-[147px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/Varro/before footer.webp"
          alt=""
          fill
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <WordReveal
          as="h2"
          className="font-eb-garamond text-[clamp(2.25rem,6vw,64px)] font-normal leading-[0.9] text-[#111]"
          segments={[{ text: "The Machine Never Makes the Call." }]}
        />

        <p className="font-schibsted-grotesk text-sm font-semibold uppercase leading-normal text-[#2C2A26]">
          Built to be handed over. On your terms.
        </p>
      </div>
    </section>
  );
}
