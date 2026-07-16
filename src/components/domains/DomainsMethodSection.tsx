import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Detect",
    body: "Identify anomalies across open signals and intercepted data.",
    bodyMobile: "Spot anomalies across open and intercepted signals.",
    icon: "/Domains/search.png",
  },
  {
    number: "02",
    title: "Decode",
    body: "Translate signals into intent and map the operational thread.",
    bodyMobile: "Map signals to intent and operational threads.",
    icon: "/Domains/code.png",
  },
  {
    number: "03",
    title: "Decide",
    body: "Validate confidence and choose the right response path.",
    bodyMobile: "Validate confidence. Choose the response path.",
    icon: "/Domains/shield-check.png",
  },
  {
    number: "04",
    title: "Deploy",
    body: "Move capability to the edge with speed and precision.",
    bodyMobile: "Move capability to the edge with precision.",
    icon: "/Domains/Vector.png",
  },
  {
    number: "05",
    title: "Deepen",
    body: "Refine the model and improve detection for the next cycle.",
    bodyMobile: "Refine detection for the next cycle.",
    icon: "/Domains/Vector.png",
  },
];

export default function DomainsMethodSection() {
  return (
    <section className="bg-[#F4F0EA] px-5 py-14 sm:px-8 lg:px-[120px] lg:py-24">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-10 lg:gap-12">
        <div className="flex flex-col gap-5 lg:gap-4">
          <div className="flex flex-col gap-3">
            <p className="font-archivo-narrow text-xs font-semibold uppercase tracking-[0.06em] text-[#6B665F] lg:text-base">
              The thread
            </p>
            <div className="h-px w-12 bg-[#6B665F] lg:w-16" />
          </div>
          <h2 className="max-w-[340px] font-eb-garamond text-[clamp(2rem,8vw,2.5rem)] font-medium leading-[1.1] text-[#111] lg:max-w-none lg:text-[clamp(2rem,5vw,56px)] lg:leading-none">
            Add a fourth threat. The method already holds.
          </h2>
        </div>

        {/* —— Mobile: stacked cards —— */}
        <div className="flex flex-col gap-4 lg:hidden">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 border border-[#111] bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 shrink-0 items-center justify-center border border-[#111] bg-[#F4F0EA]">
                  <Image
                    src={step.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </div>
                <p className="font-archivo-narrow text-sm font-normal uppercase tracking-[0.04em] text-[#6B665F]">
                  {step.number}
                </p>
              </div>
              <p className="font-eb-garamond text-[22px] font-medium leading-[1.15] text-[#111]">
                {step.title}
              </p>
              <p className="font-inter text-sm font-normal leading-[1.6] text-[#6B665F]">
                {step.bodyMobile}
              </p>
            </div>
          ))}
        </div>

        {/* —— Desktop: 5-column grid —— */}
        <div className="hidden grid-cols-5 gap-6 lg:grid">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-3 border border-[#111] bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center border border-[#111] bg-[#F4F0EA]">
                  <Image
                    src={step.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </div>
                <p className="font-archivo-narrow text-sm font-semibold uppercase text-[#6B665F]">
                  {step.number}
                </p>
              </div>
              <p className="font-eb-garamond text-xl font-medium leading-[1.2] text-[#111]">
                {step.title}
              </p>
              <p className="font-inter text-sm font-normal leading-[1.6] text-[#272521]/85">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 lg:gap-4">
          <p className="font-inter text-base font-normal leading-[1.6] text-[#272521] lg:text-lg lg:text-[#272521]/90">
            <span className="lg:hidden">
              The threat changes shape. The method does not.
            </span>
            <span className="hidden lg:inline">
              The threat changes shape. Detect, decode, decide, deploy, deepen
              does not.
            </span>
          </p>
          <Link
            href="/varro"
            className="inline-flex items-center gap-3 font-archivo-narrow text-sm font-semibold uppercase tracking-[0.04em] text-[#6B665F] transition-opacity hover:opacity-70 lg:text-base"
          >
            The mind underneath
            <span className="font-inter text-lg text-[#111] lg:text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
