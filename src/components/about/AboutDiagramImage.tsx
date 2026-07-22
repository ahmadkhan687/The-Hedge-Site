import Image from "next/image";

export default function AboutDiagramImage() {
  return (
    <section className="relative aspect-[1728/902] w-full overflow-hidden bg-[#F4F0EA]">
      <Image
        src="/About/Vector1.webp"
        alt="Strategic technology and intelligence architecture diagram"
        fill
        className="object-contain object-center"
        sizes="100vw"
        priority
      />
    </section>
  );
}
