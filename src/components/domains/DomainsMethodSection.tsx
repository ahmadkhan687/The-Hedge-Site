import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Detect",
    body: "Identify anomalies across open signals and intercepted data.",
    icon: "/images/domains/icon-search.svg",
  },
  {
    number: "02",
    title: "Decode",
    body: "Translate signals into intent and map the operational thread.",
    icon: "/images/domains/icon-code.svg",
  },
  {
    number: "03",
    title: "Decide",
    body: "Validate confidence and choose the right response path.",
    icon: "/images/domains/icon-shield.svg",
  },
  {
    number: "04",
    title: "Deploy",
    body: "Move capability to the edge with speed and precision.",
    icon: "/images/domains/icon-send.svg",
  },
  {
    number: "05",
    title: "Deepen",
    body: "Refine the model and improve detection for the next cycle.",
    icon: "/images/domains/icon-layers.svg",
  },
];

export default function DomainsMethodSection() {
  return (
    <section className="bg-[#F4F0EA] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-24">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p className="font-archivo-narrow text-base font-semibold uppercase text-[#6B665F]">
              The thread
            </p>
            <div className="h-px w-16 bg-[#6B665F]" />
          </div>
          <h2 className="font-eb-garamond text-[clamp(2rem,5vw,56px)] font-medium leading-none text-[#111]">
            Add a fourth threat. The method already holds.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
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

        <div className="flex flex-col gap-4">
          <p className="font-inter text-lg font-normal leading-[1.6] text-[#272521]/90">
            The threat changes shape. Detect, decode, decide, deploy, deepen does
            not.
          </p>
          <Link
            href="/varro"
            className="inline-flex items-center gap-3 font-archivo-narrow text-base font-semibold uppercase text-[#6B665F] transition-opacity hover:opacity-70"
          >
            The mind underneath
            <span className="font-inter text-xl text-[#111]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
