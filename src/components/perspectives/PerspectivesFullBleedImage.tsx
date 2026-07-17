import Image from "next/image";

export default function PerspectivesFullBleedImage() {
  return (
    <>
      <section className="w-full lg:hidden">
        <Image
          src="/perspectives/full_bleed_imagemobile.webp"
          alt="Abstract doctrine architecture diagram"
          width={390}
          height={240}
          className="h-auto w-full"
          sizes="100vw"
          priority
        />
      </section>

      <section className="relative hidden h-[656px] w-full overflow-hidden lg:block">
        <Image
          src="/perspectives/Full-bleed%20image.webp"
          alt="Abstract doctrine architecture diagram"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </section>
    </>
  );
}
