type CaseField = {
  label: string;
  value: string;
};

type DomainsCaseFileProps = {
  caseLabel: string;
  verdict: string;
  heading: string;
  fields: CaseField[];
  className?: string;
};

export default function DomainsCaseFile({
  caseLabel,
  verdict,
  heading,
  fields,
  className,
}: DomainsCaseFileProps) {
  const rows: CaseField[][] = [];
  for (let i = 0; i < fields.length; i += 3) {
    rows.push(fields.slice(i, i + 3));
  }

  return (
    <div
      className={`flex w-full flex-col gap-6 border border-[#2A2520] bg-[#EAE5DE] p-8 sm:p-12 ${className ?? ""}`}
    >
      <div className="flex items-center justify-between font-barlow-condensed text-xs font-extrabold uppercase text-[#6B665F]">
        <span>{caseLabel}</span>
        <span>Eyes only</span>
      </div>

      <p className="font-barlow-condensed text-[13px] font-extrabold uppercase text-[#D7A92C]">
        {verdict}
      </p>

      <p className="font-eb-garamond text-[clamp(1.25rem,2.5vw,26px)] font-medium leading-normal text-[#111]">
        {heading}
      </p>

      <div className="flex flex-col gap-5">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6"
          >
            {row.map((cell) => (
              <div key={cell.label} className="flex flex-col gap-1.5">
                <p className="font-barlow-condensed text-[11px] font-extrabold uppercase text-[#6B665F]">
                  {cell.label}
                </p>
                <p className="font-inter text-sm font-normal text-[#111]">
                  {cell.value}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
