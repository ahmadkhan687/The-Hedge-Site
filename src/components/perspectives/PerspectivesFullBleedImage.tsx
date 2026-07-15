import Image from "next/image";

export default function PerspectivesFullBleedImage() {
  return (
    <section className="relative h-[360px] w-full overflow-hidden sm:h-[500px] lg:h-[656px]">
      <Image
        src="/perspectives/Full-bleed%20image.png"
        alt="Abstract doctrine architecture diagram"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
    </section>
  );
}
