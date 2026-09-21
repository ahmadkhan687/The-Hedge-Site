"use client";

import Link from "next/link";
import { STUDY_PAGE_PATH } from "@/lib/study-constants";

export default function StudyBriefActions() {
  return (
    <section className="mt-12 flex flex-col items-start justify-between gap-7 border-y border-[#0C0C0C] border-b-4 py-7 sm:mt-[50px] sm:flex-row sm:items-center sm:gap-[30px]">
      <div>
        <p className="mb-3.5 font-inter text-[10px] font-black uppercase tracking-[0.22em] text-[#746F67]">
          Full study
        </p>
        <h3 className="m-0 font-eb-garamond text-[clamp(1.5rem,3.5vw,2rem)] font-medium text-[#0C0C0C]">
          See the youth picture at national, provincial, divisional and
          district level.
        </h3>
      </div>
      <Link
        href={`${STUDY_PAGE_PATH}/download`}
        className="inline-block shrink-0 bg-[#0C0C0C] px-[22px] py-[15px] font-inter text-xs font-black uppercase tracking-[0.12em] text-white no-underline transition-opacity hover:opacity-85"
      >
        Download the full brief →
      </Link>
    </section>
  );
}
