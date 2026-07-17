import Image from "next/image";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";
import { WordReveal } from "@/components/ui/text-reveal";

const desktopTiles = [
  { width: 19, color: "#E83387" },
  { width: 19, color: "#F08A22" },
  { width: 19, color: "#D7A92C" },
  { width: 43, color: "#19B8B7" },
  { width: 18, color: "#23B6D2" },
];

export default function SovereigntySection() {
  return (
    <section className="w-full bg-[#121212] py-10 lg:bg-[#F4F0EA] lg:py-16">
      <div
        className={`${HOME_CONTENT_SHELL} flex flex-col gap-6 lg:gap-12`}
      >
        {/* —— Mobile layout —— */}
        <div className="flex flex-col gap-6 lg:hidden">
          <div className="flex flex-col gap-2">
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8A8A8A]">
              Sovereign Intelligence
            </p>
            <p className="font-inter text-sm font-extrabold uppercase leading-normal text-[#E83387]">
              04 - Sovereignty
            </p>
            <div
              className="mt-1 flex items-center gap-[5px]"
              aria-hidden="true"
            >
              <span className="h-[10px] w-9 bg-[#E83387]" />
              <span className="h-[10px] w-9 bg-[#F08A22]" />
              <span className="h-[10px] w-9 bg-[#19B8B7]" />
              <span className="h-[10px] w-9 bg-[#23B6D2]" />
            </div>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src="/Home/HOME5.webp"
              alt="Sovereign intelligence visual"
              fill
              className="object-cover"
              sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 48px), 0px"
            />
          </div>

          <WordReveal
            as="h2"
            className="font-eb-garamond text-[clamp(1.875rem,7vw,2.5rem)] font-medium leading-[1.1] text-white"
            segments={[
              { text: "Foreign eyes are " },
              { text: "foreign government.", className: "font-semibold italic" },
            ]}
          />

          <p className="font-inter text-sm font-normal leading-[170%] text-[#A0A0A0]">
            Nations relying on foreign intelligence surrender a veto. Varro
            exists because sovereignty demands seeing the world as it is.
          </p>

          <div className="flex items-center gap-6 pt-2">
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#8A8A8A]">
              Sovereign Intelligence
            </p>
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#8A8A8A]">
              Global Intelligence
            </p>
          </div>
        </div>

        {/* —— Desktop layout (unchanged) —— */}
        <div className="hidden flex-col gap-12 lg:flex">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <p className="font-eb-garamond text-xl font-bold uppercase leading-normal text-[#D7A92C]">
                04 - Sovereignty
              </p>
              <div className="flex items-center gap-[6px]" aria-hidden="true">
                {desktopTiles.map((tile) => (
                  <span
                    key={`${tile.color}-${tile.width}`}
                    className="h-[9px] shrink-0"
                    style={{
                      width: tile.width,
                      backgroundColor: tile.color,
                    }}
                  />
                ))}
              </div>
            </div>

            <WordReveal
              as="h2"
              className="max-w-[1200px] font-eb-garamond text-[clamp(2rem,4.5vw,64px)] font-medium leading-[90%] text-[#111]"
              segments={[
                { text: "Foreign eyes are " },
                {
                  text: "foreign government.",
                  className: "font-semibold italic",
                },
              ]}
            />

            <p className="max-w-[1220px] font-inter text-[20px] font-normal leading-[160%] text-[#111]">
              Governments that rely on foreign intelligence have handed that
              intelligence a veto. The picture they receive is the picture they
              are permitted to receive. Varro exists because sovereignty
              requires that a nation see the world as it is, not as others
              choose to show it.
            </p>
          </div>

          <div className="relative aspect-[1527/642] w-full overflow-hidden border-[3px] border-[#111]">
            <Image
              src="/Home/HOME5.webp"
              alt="Sovereign intelligence visual"
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 0px, (max-width: 1728px) calc(100vw - 140px), 1588px"
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
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-6 py-6">
                <span className="h-4 w-1 shrink-0 bg-[#E83387]" />
                <p className="font-inter text-base font-extrabold uppercase leading-normal text-[#FBFAF7]">
                  Sovereign Intelligence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
