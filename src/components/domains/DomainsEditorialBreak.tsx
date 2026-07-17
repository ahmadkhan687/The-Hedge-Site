import Image from "next/image";

export default function DomainsEditorialBreak() {
  return (
    <section className="relative hidden w-full overflow-hidden lg:block lg:h-[928px]">
      <Image
       src="/Domains/IMAGES HEDGE WEB-AI REMOVAL (4).webp"
        alt="Case dossier with intelligence flow visualizations"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#111]/[0.06]" />
    </section>
  );
}
