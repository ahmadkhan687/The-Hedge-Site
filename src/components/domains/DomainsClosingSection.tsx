import Image from "next/image";

export default function DomainsClosingSection() {
  return (
    <section className="relative flex flex-col items-center gap-10 overflow-hidden px-5 py-24 sm:px-8 lg:gap-[72px] lg:px-[120px] lg:py-40">
      <Image
        src="/Domains/IMAGES HEDGE WEB-AI REMOVAL (1).png"
        alt=""
        fill
       className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/86" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.06] to-transparent" />

      <p className="relative z-10 font-barlow-condensed text-sm font-extrabold uppercase text-[#D7A92C]">
        Domain
      </p>

      <h2 className="relative z-10 max-w-[1233px] text-center font-eb-garamond text-[clamp(2.5rem,7vw,96px)] font-medium leading-[1.1] text-[#F4F0EA]">
        A nation that sees for itself, governs itself.
      </h2>

      <div className="relative z-10 h-px w-full max-w-[480px] bg-[#F4F0EA]/20" />

      <p className="relative z-10 font-barlow-condensed text-sm font-extrabold uppercase text-[#D7A92C]">
        Varro · The Hedge Collective
      </p>
    </section>
  );
}
