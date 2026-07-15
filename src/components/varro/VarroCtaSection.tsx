import Image from "next/image";
import Link from "next/link";

export default function VarroCtaSection() {
  return (
    <section className="relative flex min-h-[400px] flex-col items-center justify-center gap-8 overflow-hidden px-5 py-24 sm:px-8 lg:gap-10 lg:px-20 lg:pb-[100px] lg:pt-[147px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/Varro/before footer.png"
          alt=""
          fill
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <h2 className="font-eb-garamond text-[clamp(2.25rem,6vw,64px)] font-normal leading-[0.9] text-[#111]">
          The Machine Never Makes the Call.
        </h2>

        <Link
          href="/request-access"
          className="inline-flex items-center gap-2 font-schibsted-grotesk text-sm font-semibold uppercase leading-normal text-[#2C2A26] underline decoration-from-font underline-offset-4 transition-opacity hover:opacity-70"
        >
          Built to be handed over. On your terms.
          <Image
            src="/images/varro/arrow-right.svg"
            alt=""
            width={12}
            height={12}
            className="shrink-0"
          />
        </Link>
      </div>

      <Link
        href="/request-access"
        className="relative z-10 inline-flex h-[49px] w-[212px] items-center justify-center border-2 border-[#111] bg-[#111] font-inter text-base font-extrabold uppercase leading-normal text-[#FBFAF7] transition-opacity hover:opacity-85"
      >
        Request a briefing
      </Link>
    </section>
  );
}
