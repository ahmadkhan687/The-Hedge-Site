import Image from "next/image";
import DomainsCaseFile from "@/components/domains/DomainsCaseFile";

type Column = {
  label: string;
  text: string;
};

type CaseField = {
  label: string;
  value: string;
};

type DomainThreatSectionProps = {
  eyebrow: string;
  title: string;
  columns: Column[];
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  imageHeight?: string;
  quote: string;
  caseLabel: string;
  verdict: string;
  caseHeading: string;
  caseFields: CaseField[];
  bordered?: boolean;
  hideImageOnMobile?: boolean;
  hideCaseOnMobile?: boolean;
  mobileCaseFollowImage?: string;
};

export default function DomainThreatSection({
  eyebrow,
  title,
  columns,
  imageSrc,
  imageAlt,
  imageClassName = "object-cover object-center",
  imageHeight = "h-[400px] sm:h-[574px] lg:h-[888px]",
  quote,
  caseLabel,
  verdict,
  caseHeading,
  caseFields,
  bordered = true,
  hideImageOnMobile = false,
  hideCaseOnMobile = false,
  mobileCaseFollowImage,
}: DomainThreatSectionProps) {
  return (
    <section
      className={`px-5 py-16 sm:px-8 lg:px-[120px] lg:py-40 ${
        bordered ? "lg:border-t lg:border-[#111]" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-12 lg:gap-20">
        <div className="flex flex-col gap-6">
          <p className="font-barlow-condensed text-base font-extrabold uppercase text-[#C6A02C]">
            {eyebrow}
          </p>
          <h2 className="font-eb-garamond text-[clamp(2.25rem,5vw,64px)] font-medium leading-normal text-[#111]">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {columns.map((column) => (
            <div key={column.label} className="flex flex-col gap-3">
              <p className="font-barlow-condensed text-sm font-extrabold uppercase text-[#111]">
                {column.label}
              </p>
              <p className="font-inter text-base font-normal leading-[1.6] text-[#6B665F]">
                {column.text}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`relative w-full overflow-hidden ${imageHeight} ${
            hideImageOnMobile ? "hidden lg:block" : ""
          }`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={imageClassName}
            sizes="(max-width: 1488px) 100vw, 1488px"
          />
        </div>

        <div className="flex flex-col gap-12">
          <blockquote className="border-l-[3px] border-[#D7A92C] py-6 pl-6 font-eb-garamond text-[clamp(1.25rem,3vw,32px)] font-medium italic leading-normal text-[#111] sm:pl-6">
            {quote}
          </blockquote>

          <div className={hideCaseOnMobile ? "hidden lg:block" : undefined}>
            <DomainsCaseFile
              caseLabel={caseLabel}
              verdict={verdict}
              heading={caseHeading}
              fields={caseFields}
            />

            {mobileCaseFollowImage ? (
              <div className="relative mt-6 -mx-5 w-[calc(100%+2.5rem)] overflow-hidden sm:-mx-8 sm:w-[calc(100%+4rem)] lg:hidden">
                <Image
                  src={mobileCaseFollowImage}
                  alt="Source narrative synthesis, media fabrication, audio manipulation, and amplification vectors"
                  width={1200}
                  height={700}
                  className="block h-auto w-full"
                  sizes="100vw"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
