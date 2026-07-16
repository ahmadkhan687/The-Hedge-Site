import Image from "next/image";

export default function AboutDiagramImage() {
  return (
    <section className="relative aspect-[1728/902] w-full overflow-hidden">
      <Image
        src="/About/about2.png"
        alt="Strategic technology and intelligence architecture diagram"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
    </section>
  );
}
