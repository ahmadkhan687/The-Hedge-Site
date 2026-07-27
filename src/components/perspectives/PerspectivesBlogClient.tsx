"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ARTICLE_CATEGORIES, type Article, type ArticleCategory } from "@/lib/articles";

const TELEMETRY_COLORS = ["#e83387", "#f08a22", "#d7a92c", "#19b8b7", "#23b6d2"];

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-US", { day: "2-digit", timeZone: "UTC" });
  const month = d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const year = d.toLocaleDateString("en-US", { year: "numeric", timeZone: "UTC" });
  return `${day} ${month.toUpperCase()} ${year}`;
}

function TelemetryStrip({ h, w }: { h: number; w: number }) {
  return (
    <div className="flex gap-[3px] items-start" style={{ height: h }}>
      {TELEMETRY_COLORS.map((c) => (
        <div key={c} style={{ background: c, height: h, width: w }} />
      ))}
    </div>
  );
}

function ReadDossierLink() {
  return (
    <span className="inline-flex items-center gap-[10px]">
      <span className="font-inter text-[11px] font-extrabold uppercase tracking-[0.02em] text-[#111]">
        READ MORE
      </span>
      <span className="text-[#111] text-[11px]">→</span>
    </span>
  );
}

type Props = { articles: Article[] };

export default function PerspectivesBlogClient({ articles }: Props) {
  const [activeFilter, setActiveFilter] = useState<ArticleCategory | null>(null);

  const filtered = useMemo(() => {
    if (!activeFilter) return articles;
    return articles.filter((a) => a.category === activeFilter);
  }, [articles, activeFilter]);

  const featured = filtered[0] ?? null;
  const grid = featured ? filtered.slice(1, 7) : filtered.slice(0, 6);

  const filters: { label: string; value: ArticleCategory | null }[] = [
    { label: "ALL INTELLIGENCE", value: null },
    ...ARTICLE_CATEGORIES.map((c) => ({ label: c, value: c })),
  ];

  return (
    <div className="bg-[#F4F0EA] flex flex-col items-start relative size-full">
      {/* Hero */}
      <section className="flex flex-col gap-[40px] pb-[80px] pt-[120px] px-5 sm:px-8 lg:px-[120px] relative w-full">
        <div className="flex flex-col gap-[16px] items-start relative w-full">
          <p className="font-inter font-medium leading-[normal] text-[#6b665f] text-[14px] uppercase w-full">
            SOVEREIGN FORESIGHT / SECURITY TELEMETRY / DEFENSE REPORT
          </p>
          <p className="font-eb-garamond font-normal leading-[0.95] text-[#111] text-[clamp(3rem,8vw,110px)] w-full">
            Perspectives &amp; Insights
          </p>
        </div>

        <p className="font-eb-garamond font-normal leading-[1.5] text-[#6b665f] text-[24px] w-full max-w-[720px]">
          We monitor the entire geopolitical field to deliver attribution and
          cyber answers before a nation forms the question. Read our active
          defensive briefs.
        </p>
      </section>

      {/* Filter pills */}
      <section className="flex flex-col gap-[24px] items-start pb-[48px] px-5 sm:px-8 lg:px-[120px] relative w-full">
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-x-0 top-[-1px] border-t border-[#1E2124]" />
        </div>

        <div className="flex flex-wrap gap-[16px] items-start w-full">
          {filters.map((f) => {
            const isActive = f.value === activeFilter;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                className={
                  isActive
                    ? "bg-[#111315] border border-[#111315] flex items-center px-[16px] py-[8px] rounded-[2px] shrink-0 cursor-pointer"
                    : "bg-transparent border border-[rgba(107,102,95,0.2)] flex items-center px-[16px] py-[8px] rounded-[2px] shrink-0 cursor-pointer"
                }
              >
                <span
                  className={
                    isActive
                      ? "font-inter font-medium leading-[normal] text-[#f3f1ea] text-[12px] whitespace-nowrap uppercase"
                      : "font-inter font-medium leading-[normal] text-[#6b665f] text-[12px] whitespace-nowrap uppercase"
                  }
                >
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured card */}
      <section className="flex flex-col items-start pb-[80px] px-5 sm:px-8 lg:px-[120px] relative w-full">
        <div className="border border-[#1e2124] w-full h-auto lg:h-[540px] overflow-clip relative">
          {featured ? (
            <Link
              href={`/perspectives/${featured.slug}`}
              className="flex flex-col lg:flex-row h-full items-stretch no-underline"
            >
              <div className="relative w-full lg:w-[900px] h-[260px] lg:h-full">
                {featured.cover_image_url ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={featured.cover_image_url}
                      alt={featured.title}
                      fill
                      priority
                      unoptimized={featured.cover_image_url.includes("supabase.co")}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[rgba(17,19,21,0.2)] mix-blend-multiply" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-[#111]/10" />
                )}

                <div className="absolute top-[24px] left-[24px] bg-[#d7a92c] flex items-start px-[12px] py-[6px] rounded-[2px]">
                  <p className="font-inter font-extrabold text-[#111315] text-[11px] whitespace-nowrap uppercase">
                    FEATURED INTERCEPT // CLASSIFIED
                  </p>
                </div>

                <div className="absolute bottom-[24px] right-[24px] flex items-end">
                  <TelemetryStrip h={6} w={18} />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between h-full p-6 lg:p-[48px] gap-8">
                <div className="flex flex-col gap-[16px] items-start">
                  <p className="font-inter font-extrabold leading-[normal] text-[#e83387] text-[12px] whitespace-nowrap uppercase">
                    {featured.category}
                  </p>
                  <p className="font-eb-garamond font-medium leading-[1.1] text-[#111] text-[clamp(1.5rem,3vw,40px)]">
                    {featured.title}
                  </p>
                  {featured.subtitle ? (
                    <p className="font-eb-garamond font-normal leading-[1.5] text-[#6b665f] text-[18px]">
                      {featured.subtitle}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center justify-between whitespace-nowrap">
                  <div className="flex flex-col gap-[4px] items-start">
                    <p className="font-inter font-normal text-[#6b665f] text-[11px] uppercase">
                      AUTHOR // ANALYST
                    </p>
                    <p className="font-inter font-medium text-[#111] text-[14px]">
                      THE HEDGE COLLECTIVE
                    </p>
                  </div>
                  <div className="flex flex-col gap-[4px] items-end">
                    <p className="font-inter font-normal text-[#6b665f] text-[11px] uppercase">
                      PUBLISHED // DELIVERED
                    </p>
                    <p className="font-inter font-medium text-[#111] text-[14px]">
                      {formatDate(featured.published_at)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="font-inter text-[#6B665F]">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="flex flex-col gap-[48px] pb-[120px] pt-0 px-5 sm:px-8 lg:px-[120px] relative w-full">
        <div className="flex items-end justify-between w-full">
          <p className="font-inter font-extrabold text-[#111] text-[16px] whitespace-nowrap uppercase">
            ACTIVE INTELLIGENCE DOSSIERS
          </p>
          <TelemetryStrip h={8} w={28} />
        </div>

        {grid.length > 0 ? (
          <div className="grid grid-cols-1 gap-[32px] w-full md:grid-cols-2 lg:grid-cols-3">
            {grid.map((article) => {
              const footerTime = article.reading_time_minutes
                ? `${article.reading_time_minutes} MIN READ`
                : null;
              const footerMeta = `${formatDate(article.published_at)}${
                footerTime ? ` // ${footerTime}` : ""
              }`;

              return (
                <Link
                  key={article.id}
                  href={`/perspectives/${article.slug}`}
                  className="border border-[#1e2124] flex flex-col h-[560px] overflow-clip relative no-underline group"
                >
                  <div className="relative h-[240px] w-full">
                    {article.cover_image_url ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={article.cover_image_url}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          unoptimized={article.cover_image_url.includes("supabase.co")}
                        />
                        <div className="absolute inset-0 bg-[rgba(17,19,21,0.15)] mix-blend-multiply" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-[#111]/10" />
                    )}

                    <div className="absolute top-[16px] left-[16px] right-[16px] flex items-center justify-between">
                      <div className="bg-[#111315] flex items-start px-[8px] py-[4px]">
                        <p className="font-inter font-medium text-[#f3f1ea] text-[9px] whitespace-nowrap uppercase">
                          RESTRICTED
                        </p>
                      </div>
                      <TelemetryStrip h={4} w={8} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between flex-1 p-[24px]">
                    <div className="flex flex-col gap-[12px] items-start">
                      <p className="font-inter font-extrabold text-[#d7a92c] text-[11px] whitespace-nowrap uppercase">
                        {article.category}
                      </p>
                      <p className="font-eb-garamond font-medium leading-[1.2] text-[#111] text-[24px]">
                        {article.title}
                      </p>
                      {article.subtitle ? (
                        <p className="font-eb-garamond font-normal leading-[1.4] text-[#6b665f] text-[15px] line-clamp-3">
                          {article.subtitle}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between whitespace-nowrap mt-6">
                      <p className="font-inter font-normal text-[#6b665f] text-[10px]">
                        {footerMeta}
                      </p>
                      <ReadDossierLink />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="font-inter text-[#6B665F]">No published perspectives yet.</p>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-[#111315] flex flex-col gap-[48px] items-start pb-[64px] pt-[96px] px-5 sm:px-8 lg:px-[120px] relative w-full">
        <div className="flex flex-col gap-[16px] items-start relative w-full">
          <p className="font-inter font-extrabold text-[#d7a92c] text-[14px] uppercase">
            05 - COMMUNICATIONS BRIEF
          </p>
          <div className="h-px w-full bg-white/10" />
        </div>

        <div className="flex flex-col gap-[64px] items-start lg:flex-row w-full">
          <div className="flex flex-col gap-[16px] items-start text-[#f3f1ea] max-w-[760px]">
            <p className="font-eb-garamond font-medium leading-none text-[clamp(2.2rem,4.8vw,80px)]">
              A nation that secures itself keeps its own counsel.
            </p>
            <p className="font-eb-garamond font-normal opacity-70 text-[18px] leading-[1.6]">
              Receive the monthly secure terminal briefs directly to your inbox.
              We analyze regional cyber activity, threat actor groups, and macro
              infrastructure vulnerabilities. No telemetry logging.
            </p>
          </div>

          <div className="flex flex-col gap-[24px] flex-1 w-full">
            <div className="flex items-center justify-between px-[16px] py-[14px] w-full bg-transparent">
              <input
                name="email"
                type="email"
                placeholder="ENTER SECURE EMAIL ADDRESS"
                className="bg-transparent w-full outline-none font-inter text-[14px] opacity-60 text-[#f3f1ea]"
              />
              <TelemetryStrip h={6} w={18} />
            </div>

            <button
              type="button"
              className="bg-[#d7a92c] w-full rounded-[2px] px-[32px] py-[16px] text-left"
            >
              <span className="font-inter font-extrabold text-[#111315] text-[14px] uppercase">
                SUBSCRIBE TO BRIEFINGS
              </span>
            </button>

            <p className="font-inter opacity-40 text-[#f3f1ea] text-[11px]">
              SUBMISSION SECURED // AES-256 ENCRYPTED PATHWAY
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
