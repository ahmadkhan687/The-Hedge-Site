import Image from "next/image";

export default function VideoSection() {
  return (
    <section
      id="video"
      className="overflow-hidden  bg-[#FBFAF7] px-5 py-10 sm:px-8 lg:px-[94px] lg:py-0"
    >
      <div className="relative mx-auto h-[min(56vw,778px)] w-full max-w-[1540px] min-h-[280px] overflow-hidden border-[3px] border-[#111] lg:h-[778px]">
        <Image
          src="/images/home/hero-map.jpg"
          alt="Strategic global intelligence map"
          fill
          className="object-cover"
          sizes="(max-width: 1540px) 100vw, 1540px"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(245.6deg, rgba(0, 0, 0, 0.64) 0%, rgb(0, 0, 0) 100%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0">
          <div
            className="h-[77px] w-full"
            style={{
              backgroundImage:
                "linear-gradient(177deg, rgba(0, 0, 0, 0) 25%, rgba(17, 17, 17, 0.8) 75%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-6 py-6">
            <span className="h-4 w-1 shrink-0 bg-[#E83387]" />
            <p className="font-inter text-base font-extrabold uppercase leading-normal text-[#FBFAF7]">
              Strategic Products / Intelligence / Delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
