import Image from "next/image";

export default function DomainsEditorialBreak() {
  return (
    <section className="relative h-[400px] w-full overflow-hidden sm:h-[600px] lg:h-[928px]">
      <Image
        src="/images/domains/editorial-break.jpg"
        alt="Case dossier with intelligence flow visualizations"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#111]/[0.06]" />
    </section>
  );
}
