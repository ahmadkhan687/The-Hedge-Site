"use client";

import { useEffect, useState } from "react";

const TOC = [
  { id: "information-we-collect", n: "01", label: "Information we collect" },
  { id: "how-we-use-information", n: "02", label: "How we use information" },
  {
    id: "cookies-and-similar-technologies",
    n: "03",
    label: "Cookies and similar technologies",
  },
  {
    id: "sharing-and-service-providers",
    n: "04",
    label: "Sharing and service providers",
  },
  { id: "data-retention", n: "05", label: "Data retention" },
  { id: "security", n: "06", label: "Security" },
  { id: "your-rights-and-choices", n: "07", label: "Your rights and choices" },
  { id: "international-transfers", n: "08", label: "International transfers" },
  { id: "childrens-privacy", n: "09", label: "Children’s privacy" },
  { id: "policy-updates", n: "10", label: "Policy updates" },
  { id: "contact-information", n: "11", label: "Contact information" },
] as const;

const SECTIONS = [
  {
    id: "information-we-collect",
    n: "01",
    title: "Information we collect",
    paragraphs: [
      "We may collect information you provide directly, including your name, work email, organisation, role, correspondence and access-request details.",
      "When you use our site, we may also receive technical and usage data such as Browser type, device identifiers, pages viewed, referring URLs and approximate location.",
    ],
  },
  {
    id: "how-we-use-information",
    n: "02",
    title: "How we use information",
    paragraphs: [
      "We use information to operate and secure the site, respond to enquiries, assess access requests, deliver requested communications, understand site performance, prevent misuse and meet our legal obligations.",
      "Where required, we rely on consent; otherwise our processing may be necessary to perform a contract, comply with law or pursue legitimate interests that do not override your rights.",
    ],
  },
  {
    id: "cookies-and-similar-technologies",
    n: "03",
    title: "Cookies and similar technologies",
    paragraphs: [
      "Strictly necessary cookies support core site functions and security, including admin authentication and access to gated study content. We also use limited session storage to improve the homepage experience.",
      "With your choice, optional analytics technologies (Google Tag Manager and related measurement cookies) may help us understand site use and improve the experience. Analytics cookies are off by default until you accept them via our cookie controls.",
      "You can Accept all, Reject all, or Manage cookies on the banner. Your choice is stored in your browser so we can respect it on future visits. You can also clear site data in your browser settings.",
    ],
  },
  {
    id: "sharing-and-service-providers",
    n: "04",
    title: "Sharing and service providers",
    paragraphs: [
      "We may share limited information with vetted providers that support hosting, security, analytics, communications and professional advice. They may process information only under our instructions and appropriate confidentiality terms.",
      "We may also disclose information where required by law, to protect rights or safety, or in connection with a reorganisation or transaction. We do not sell personal information.",
    ],
  },
  {
    id: "data-retention",
    n: "05",
    title: "Data retention",
    paragraphs: [
      "We retain personal information only for as long as needed for the purposes described here, including to satisfy legal, accounting, security and dispute-resolution requirements. Retention periods vary by record type and context.",
      "When information is no longer required, we delete or anonymise it using reasonable measures.",
    ],
  },
  {
    id: "security",
    n: "06",
    title: "Security",
    paragraphs: [
      "We use proportionate organisational and technical safeguards designed to protect information against accidental loss, unauthorised access, alteration or disclosure. No system can be guaranteed completely secure.",
      "If you believe information connected with us may be at risk, please contact us promptly using the details below.",
    ],
  },
  {
    id: "your-rights-and-choices",
    n: "07",
    title: "Your rights and choices",
    paragraphs: [
      "Depending on where you live, you may have rights to access, correct, delete, restrict or object to processing, request portability, withdraw consent, or lodge a complaint with a supervisory authority.",
      "To exercise a right, contact us. We may need to verify your identity and may retain a record of the request where permitted. You can opt out of non-essential communications at any time.",
    ],
  },
  {
    id: "international-transfers",
    n: "08",
    title: "International transfers",
    paragraphs: [
      "The Hedge Collective and its providers may process information in countries other than your own. Where required, we use recognised safeguards for international transfers, such as adequacy decisions or approved contractual clauses.",
    ],
  },
  {
    id: "childrens-privacy",
    n: "09",
    title: "Children’s privacy",
    paragraphs: [
      "Our site and services are intended for professional audiences and are not directed to children. We do not knowingly collect personal information from children under 16. If you believe a child has provided information, please contact us.",
    ],
  },
  {
    id: "policy-updates",
    n: "10",
    title: "Policy updates",
    paragraphs: [
      "We may update this draft policy as our practices, services or legal obligations change. We will post the revised version here and update the effective date. Material changes may be highlighted through an additional notice where appropriate.",
    ],
  },
  {
    id: "contact-information",
    n: "11",
    title: "Contact information",
    paragraphs: [
      "Questions, requests or concerns about privacy can be sent to innovate@thehedgecollective.com.",
      "The Hedge Collective · Privacy Office · London, United Kingdom. Please include enough detail for us to understand and respond to your request.",
    ],
  },
] as const;

export default function PrivacyPolicySection() {
  const [activeId, setActiveId] = useState<string>(TOC[0].id);

  useEffect(() => {
    const updateActive = () => {
      // Marker near sticky nav — section under that point stays bold
      const markerY = 140;
      let current: (typeof TOC)[number]["id"] = TOC[0].id;

      for (const item of TOC) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= markerY) current = item.id;
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <section className="bg-[#F4F0EA] text-[#111]">
      <div className="mx-auto flex w-full max-w-[1728px] flex-col gap-12 px-5 pb-16 pt-12 sm:gap-14 sm:px-8 sm:pb-20 sm:pt-16 lg:gap-[70px] lg:px-[94px] lg:pb-[120px] lg:pt-[104px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[910px] flex-col gap-5 sm:gap-6">
            <p className="font-inter text-[13px] font-bold uppercase tracking-[0.02em] text-[#67635E]">
              Governance / Privacy / Trust
            </p>
            <h1 className="font-eb-garamond text-[clamp(3rem,8vw,5.75rem)] font-normal leading-[0.92] tracking-[-0.02em] text-[#111]">
              Privacy Policy
            </h1>
            <p className="max-w-[760px] font-eb-garamond text-[clamp(1.125rem,2.5vw,1.5625rem)] font-normal leading-[1.42] text-[#111]">
              We believe privacy is part of operational integrity. This page
              explains how The Hedge Collective handles personal information
              across our website and communications.
            </p>
          </div>

          <div className="flex w-full flex-col gap-[18px] lg:w-[340px] lg:shrink-0">
            <div className="flex items-start gap-1" aria-hidden>
              <span className="h-2 w-[18px] bg-[#E83387]" />
              <span className="h-2 w-[18px] bg-[#F08A22]" />
              <span className="h-2 w-[62px] bg-[#D7A92C]" />
              <span className="h-2 w-[18px] bg-[#19B8B7]" />
              <span className="h-2 w-[18px] bg-[#23B6D2]" />
            </div>
            <p className="font-inter text-[13px] font-bold uppercase text-[#111]">
              {/* Effective 23 September 2026 */}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[120px]">
          <nav
            aria-label="On this page"
            className="lg:sticky lg:top-28 lg:w-[330px] lg:shrink-0 lg:self-start"
          >
            <p className="mb-5 font-inter text-[13px] font-bold uppercase text-[#111]">
              On this page
            </p>
            <ul className="m-0 flex list-none flex-col gap-5 p-0">
              {TOC.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => setActiveId(item.id)}
                      className={`group flex gap-3.5 no-underline transition-opacity hover:opacity-70 ${
                        isActive ? "font-bold" : "font-normal"
                      }`}
                    >
                      <span
                        className={`w-7 shrink-0 font-inter text-xs text-[#E83387] group-hover:font-bold ${
                          isActive ? "font-bold" : "font-normal"
                        }`}
                      >
                        {item.n}
                      </span>
                      <span
                        className={`font-inter text-[13px] leading-[1.35] text-[#111] group-hover:font-bold ${
                          isActive ? "font-bold" : "font-normal"
                        }`}
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="min-w-0 flex-1 lg:max-w-[920px]">
            {SECTIONS.map((section) => (
              <article
                key={section.id}
                id={section.id}
                onMouseEnter={() => setActiveId(section.id)}
                className="scroll-mt-28 border-t border-[#C9C3BA] pb-10 pt-8 sm:pb-[52px] sm:pt-[42px]"
              >
                <div className="flex gap-6 sm:gap-11">
                  <p className="w-10 shrink-0 font-inter text-[13px] font-bold text-[#E83387] sm:w-16">
                    {section.n}
                  </p>
                  <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
                    <h2 className="font-eb-garamond text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-[1.08] text-[#111]">
                      {section.title}
                    </h2>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="font-eb-garamond text-base font-normal leading-[1.62] text-[#111] sm:text-lg"
                      >
                        {paragraph.includes(
                          "innovate@thehedgecollective.com",
                        ) ? (
                          <>
                            Questions, requests or concerns about privacy can be
                            sent to{" "}
                            <a
                              href="mailto:innovate@thehedgecollective.com"
                              className="text-[#111] underline underline-offset-2"
                            >
                              innovate@thehedgecollective.com
                            </a>
                            .
                          </>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
