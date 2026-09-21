import StudyBriefActions from "@/components/perspectives/StudyBriefActions";

const FINDINGS = [
  {
    n: "01",
    title: "National direction: youth support is larger.",
    body: "76% of clear measured youth positions support creating additional provinces; 24% oppose.",
  },
  {
    n: "02",
    title: "Geography is the differentiator.",
    body: "Punjab, Khyber Pakhtunkhwa, Balochistan and Islamabad show supportive majorities in the measured youth discussion. Sindh is more contested. AJK and Gilgit-Baltistan show oppositional majorities.",
  },
  {
    n: "03",
    title: "Support and opposition are driven by different concerns.",
    body: "Governance and access is the largest measured driver of youth support. Identity and territorial integrity is the largest measured driver of youth opposition.",
  },
  {
    n: "04",
    title: "Resolution changes the read.",
    body: "Division- and district-level youth readings reveal variation that disappears when the country is viewed only through a national or provincial percentage.",
  },
  {
    n: "05",
    title: "Direction, not prediction.",
    body: "The percentages describe clear positions within observed youth digital discussion. They are not population estimates, voting intentions or a referendum forecast.",
  },
] as const;

const FACTS = [
  {
    value: "98,368",
    label: "unique youth records analysed across the study corpus.",
  },
  {
    value: "76 / 24",
    label: "national share of clear youth positions: support / oppose.",
  },
  {
    value: "52 days",
    label: "measurement window: 31 July–20 September 2026.",
  },
] as const;

export default function PakistanAdminGeographyStudyLanding() {
  return (
    <main className="bg-[#F7F5EF] text-[#0C0C0C]">
      <div className="mx-auto max-w-[1180px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-[42px] lg:pb-[70px] lg:pt-[34px]">
        <header className="flex flex-col gap-5 border-b-4 border-[#0C0C0C] pb-[18px] sm:flex-row sm:items-start sm:justify-between sm:gap-[30px]">
          <div>
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.42em] text-[#746F67]">
              The
            </p>
            <p className="font-eb-garamond text-[30px] leading-none text-[#0C0C0C]">
              <em className="font-normal">Hedge</em> Collective
            </p>
          </div>
          <div className="font-inter text-[11px] font-extrabold uppercase leading-[1.6] tracking-[0.16em] text-[#746F67] sm:text-right">
            Strategic Studies · Public Research
            <br />
            September 2026
            <div
              className="mt-2.5 grid h-2 grid-cols-5 gap-[5px]"
              aria-hidden
            >
              <i className="block bg-[#E83387]" />
              <i className="block bg-[#F08A22]" />
              <i className="block bg-[#D7A92C]" />
              <i className="block bg-[#19B8B7]" />
              <i className="block bg-[#23B6D2]" />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-10 border-b border-[#0C0C0C] py-11 sm:gap-[34px] lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-[70px] lg:py-[72px_54px]">
          <div>
            <p className="mb-[18px] font-inter text-[11px] font-black uppercase tracking-[0.28em] text-[#E83387]">
              Pakistan · Youth Administrative Geography
            </p>
            <h1 className="mb-6 font-eb-garamond text-[clamp(2.75rem,8vw,4.25rem)] font-medium leading-[0.94] tracking-[-0.035em] text-[#0C0C0C] lg:mb-[25px]">
              Pakistan’s Administrative Geography
            </h1>
            <p className="max-w-[760px] font-inter text-[19px] leading-[1.42] text-[#0C0C0C] sm:text-[22px]">
              A directional study of youth discussion around creating additional
              provinces, with national, provincial, divisional and district-level
              variation.
            </p>
          </div>

          <aside className="border-t-4 border-[#0C0C0C] pt-[17px]">
            {FACTS.map((fact) => (
              <div
                key={fact.value}
                className="border-b border-[#D5D0C7] py-4"
              >
                <b className="mb-1 block font-eb-garamond text-[31px] font-medium leading-none text-[#0C0C0C]">
                  {fact.value}
                </b>
                <span className="font-inter text-xs font-bold leading-[1.45] text-[#36332F]">
                  {fact.label}
                </span>
              </div>
            ))}
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-10 pt-10 sm:gap-[34px] lg:grid-cols-2 lg:gap-[70px] lg:pt-[50px]">
          <div>
            <p className="mb-3.5 font-inter text-[10px] font-black uppercase tracking-[0.22em] text-[#746F67]">
              Study read
            </p>
            <h2 className="mb-[18px] font-eb-garamond text-[clamp(1.75rem,4vw,2.125rem)] font-medium text-[#0C0C0C]">
              One national number. Multiple local realities.
            </h2>
            <p className="font-inter text-lg leading-[1.55] text-[#0C0C0C]">
              The national average is useful. It is not sufficient. Across
              measured youth discussion, support for creating additional
              provinces is more prevalent overall. The study then moves below
              that number: province by province, division by division, district
              by district. The result is a geographic map of where youth
              positions hold, where they weaken and where the local picture
              departs from the national one.
            </p>
          </div>

          <div>
            <p className="mb-3.5 font-inter text-[10px] font-black uppercase tracking-[0.22em] text-[#746F67]">
              Key findings
            </p>
            <ol className="m-0 list-none p-0">
              {FINDINGS.map((item) => (
                <li
                  key={item.n}
                  className="grid grid-cols-[42px_1fr] gap-4 border-t border-[#D5D0C7] py-[18px]"
                >
                  <span className="font-inter text-[11px] font-black tracking-[0.1em] text-[#746F67]">
                    {item.n}
                  </span>
                  <div>
                    <b className="mb-1.5 block font-inter text-base font-bold text-[#0C0C0C]">
                      {item.title}
                    </b>
                    <p className="m-0 font-inter text-sm leading-[1.45] text-[#45413C]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 gap-5 border-y border-[#D5D0C7] border-t-4 border-t-[#0C0C0C] py-[22px] sm:mt-12 sm:grid-cols-[180px_1fr] sm:gap-7">
          <strong className="font-inter text-[10px] font-bold uppercase tracking-[0.22em] text-[#0C0C0C]">
            Evidence base
          </strong>
          <span className="font-inter text-sm leading-[1.5] text-[#0C0C0C]">
            Youth digital discussion across social platforms, online news and
            publicly available print reporting. The study uses clear youth
            positions only; neutral, informational and genuinely ambiguous
            material is excluded from the Support/Oppose split.
          </span>
        </div>

        <StudyBriefActions />

        <p className="mt-5 max-w-[900px] font-inter text-[11px] leading-[1.55] text-[#746F67]">
          Findings describe observed youth digital discussion during the stated
          measurement window and should be interpreted as directional evidence,
          not population polling.
        </p>
      </div>
    </main>
  );
}
