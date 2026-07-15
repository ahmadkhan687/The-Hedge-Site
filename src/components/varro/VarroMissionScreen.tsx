import { cn } from "@/lib/utils";

const verdictRows = [
  {
    field: "FIELD",
    value: "A fabricated massacre, synthetic footage, 5 languages",
  },
  {
    field: "HAND",
    value: "A 6,000-account network amplifying it",
  },
  {
    field: "PATH",
    value: "30 real actors recruited to act on the lie",
  },
  {
    field: "FUSION",
    value: "Connected as one operation, one foreign service",
  },
  {
    field: "THE MOVE",
    value: "Pre-empt the footage, expose the network, intercept the cell",
  },
  {
    field: "SOURCES",
    value: "2 confirmed",
  },
];

export default function VarroMissionScreen({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-sm border border-[#DDD9CD] bg-[#F2F0EA] shadow-[0_16px_36px_rgba(0,0,0,0.18)]",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between bg-[#C6A02C] px-4 py-3 font-archivo-narrow text-[10px] font-normal uppercase tracking-[1.3px] sm:px-5">
        <span className="text-[#111]">Daily verdict . 06:00 .</span>
        <span className="text-[#111]/70">Eyes only</span>
      </div>

      <div className="flex flex-1 flex-col gap-5 bg-[#F2F0EA] p-5 sm:gap-6 sm:p-6 lg:p-7">
        <p className="font-archivo-narrow text-[10px] font-semibold uppercase tracking-[1.4px] text-[#73706E]">
          Verdict . one hand . three fronts
        </p>

        <p className="font-inter text-base font-bold leading-snug text-[#333338] sm:text-lg">
          A single foreign campaign struck a partner nation on all three fronts
          at once, timed to the referendum.
        </p>

        <div className="mt-auto flex flex-col">
          {verdictRows.map((row) => (
            <div
              key={row.field}
              className="flex items-start justify-between gap-4 border-b border-[#E3DFD2] py-3 last:border-b-0 sm:py-3.5"
            >
              <span className="shrink-0 font-archivo-narrow text-[10px] font-normal uppercase tracking-[0.7px] text-[#73706E]">
                {row.field}
              </span>
              <span className="text-right font-inter text-sm leading-snug text-[#333338] sm:text-base">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
