import Link from "next/link";
import Image from "next/image";
import OperatingModelColorBars from "@/components/home/OperatingModelColorBars";
import { HOME_CONTENT_SHELL } from "@/components/home/homeLayout";

type SectionButtonProps = {
  href: string;
  label: string;
  variant: "outline" | "filled";
  paddingClass: string;
};

function SectionButton({
  href,
  label,
  variant,
  paddingClass,
}: SectionButtonProps) {
  return (
    <Link
      href={href}
      className={`flex min-h-[44px] w-full items-center justify-center gap-2 border-2 border-[#111] font-inter text-xs font-extrabold uppercase leading-normal transition-opacity hover:opacity-80 sm:w-auto sm:justify-end sm:text-sm lg:text-base ${paddingClass} ${
        variant === "filled"
          ? "bg-[#111] text-white"
          : "bg-transparent text-[#111]"
      }`}
    >
      {label}
      <svg
        width={12}
        height={12}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M2.4996 6H9.5004M6 9.5004L9.5004 6L6 2.4996"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}

export default function OperatingModelSection() {
  return (
    <section id="operating-model" className="overflow-hidden bg-[#F4F0EA] pb-10 sm:pb-10 lg:pb-12">
      <div className={HOME_CONTENT_SHELL}>
        <div className="border-t-[4.14px] border-[#111] pt-10 lg:pt-12">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="font-inter text-sm font-extrabold uppercase leading-normal text-[#E83387] sm:text-base">
            Operating Model
          </p>
          <OperatingModelColorBars />
        </div>

        <p className="mt-6 max-w-full font-eb-garamond text-[clamp(1.2rem,4vw,2.07rem)] font-medium leading-[120%] text-[#111111] sm:mt-8">
          One mind reads the whole field. The analysis, the attribution, the
          answer - before the country has formed the question.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-14 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-2 sm:justify-end sm:self-end lg:mt-20">
          <SectionButton
            href="/request-access"
            label="Request a Briefing"
            variant="outline"
            paddingClass="px-4 py-3 sm:pl-4 sm:pr-[8px] sm:pt-3 sm:pb-[10px]"
          />
          <SectionButton
            href="/about"
            label="Read Technical Thesis"
            variant="filled"
            paddingClass="px-4 py-3 sm:pl-4 sm:pr-2 sm:pt-3 sm:pb-[10px]"
          />
        </div>

        <div className="relative mt-6 w-full overflow-hidden border border-[#111] sm:mt-10">
          <Image
            src="/Home/HOME1.png"
            alt="Operating model visual"
            width={1540}
            height={760}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1728px) 100vw, 1728px"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
