import Image from "next/image";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";

const tiles = [
  { width: 19, color: "#E83387" },
  { width: 19, color: "#F08A22" },
  { width: 19, color: "#D7A92C" },
  { width: 43, color: "#19B8B7" },
  { width: 18, color: "#23B6D2" },
];

export default function SovereigntySection() {
  return (
    <section className="w-full bg-[#F4F0EA] py-10 lg:py-16">
      <div className={`${HOME_CONTENT_SHELL} flex flex-col gap-8 sm:gap-10 lg:gap-12`}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <p className="font-eb-garamond text-lg font-bold uppercase leading-normal text-[#D7A92C] sm:text-xl">
              04 - Sovereignty
            </p>
            <div className="flex items-center gap-[6px]" aria-hidden="true">
              {tiles.map((tile) => (
                <span
                  key={`${tile.color}-${tile.width}`}
                  className="h-[9px] shrink-0"
                  style={{ width: tile.width, backgroundColor: tile.color }}
                />
              ))}
            </div>
          </div>

          <h2 className="max-w-[1200px] font-eb-garamond text-[clamp(2rem,4.5vw,64px)] font-medium leading-[90%] text-[#111]">
            Foreign eyes are{" "}
            <span className="font-semibold italic">foreign government.</span>
          </h2>

          <p className="max-w-[1220px] font-inter text-base font-normal leading-[160%] text-[#111] sm:text-lg lg:text-[20px]">
            Governments that rely on foreign intelligence have handed that
            intelligence a veto. The picture they receive is the picture they
            are permitted to receive. Varro exists because sovereignty requires
            that a nation see the world as it is, not as others choose to show
            it.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden border-[3px] border-[#111]"
          style={{ aspectRatio: "1527 / 642" }}
        >
          <Image
            src="/Home/HOME5.png"
            alt="Sovereign intelligence visual"
            fill
            className="object-cover"
            sizes="(max-width: 1728px) 100vw, 1728px"
          />
          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute inset-x-0 bottom-0">
            <div
              className="h-16 w-full"
              style={{
                backgroundImage:
                  "linear-gradient(177deg, rgba(0, 0, 0, 0) 25%, rgba(17, 17, 17, 0.8) 75%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-4 py-4 sm:gap-3 sm:px-6 sm:py-6">
              <span className="h-3 w-1 shrink-0 bg-[#E83387] sm:h-4" />
              <p className="font-inter text-xs font-extrabold uppercase leading-normal text-[#FBFAF7] sm:text-sm lg:text-base">
                Sovereign Intelligence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
