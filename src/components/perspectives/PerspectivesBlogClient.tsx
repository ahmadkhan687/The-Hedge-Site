"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ARTICLE_CATEGORIES,
  type Article,
  type ArticleCategory,
} from "@/lib/articles";
import { trackEvent } from "@/lib/gtm";

const TELEMETRY_COLORS = [
  "#e83387",
  "#f08a22",
  "#d7a92c",
  "#19b8b7",
  "#23b6d2",
];

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-US", {
    day: "2-digit",
    timeZone: "UTC",
  });
  const month = d.toLocaleDateString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const year = d.toLocaleDateString("en-US", {
    year: "numeric",
    timeZone: "UTC",
  });
  return `${day} ${month.toUpperCase()} ${year}`;
}

function TelemetryStrip({ h, w }: { h: number; w: number }) {
  return (
    <div className="flex shrink-0 items-start gap-[3px]" style={{ height: h }}>
      {TELEMETRY_COLORS.map((c) => (
        <div key={c} style={{ background: c, height: h, width: w }} />
      ))}
    </div>
  );
}

function ReadDossierLink() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 sm:gap-[10px]">
      <span className="font-inter text-[10px] font-extrabold uppercase tracking-[0.02em] text-[#111] sm:text-[11px]">
        READ MORE
      </span>
      <span className="text-[10px] text-[#111] sm:text-[11px]">→</span>
    </span>
  );
}

type Props = { articles?: Article[] | null };

export default function PerspectivesBlogClient({
  articles: articlesProp = null,
}: Props) {
  const [articles, setArticles] = useState<Article[] | null>(articlesProp);
  const [activeFilter, setActiveFilter] = useState<ArticleCategory | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  // Fetch after first paint so hero can show immediately
  useEffect(() => {
    if (articlesProp !== null && articlesProp !== undefined) {
      setArticles(articlesProp);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/perspectives/articles");
        const data = (await res.json()) as { articles?: Article[] };
        if (!cancelled) {
          setArticles(Array.isArray(data.articles) ? data.articles : []);
        }
      } catch {
        if (!cancelled) setArticles([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [articlesProp]);

  const isLoading = articles === null;
  const list = articles ?? [];

  const filtered = useMemo(() => {
    if (!activeFilter) return list;
    return list.filter((a) => a.category === activeFilter);
  }, [list, activeFilter]);

  const featured = filtered[0] ?? null;
  // With one article, show it in featured and in the grid so the section isn't empty.
  const grid =
    filtered.length === 1 ? filtered : filtered.slice(1, 7);

  // Only show category pills that currently have at least one published article.
  const categoriesWithArticles = useMemo(() => {
    const present = new Set(list.map((a) => a.category));
    const presets = ARTICLE_CATEGORIES.filter((c) => present.has(c));
    const custom = [...present]
      .filter((c) => !(ARTICLE_CATEGORIES as readonly string[]).includes(c))
      .sort((a, b) => a.localeCompare(b));
    return [...presets, ...custom];
  }, [list]);

  useEffect(() => {
    if (
      activeFilter &&
      !categoriesWithArticles.includes(activeFilter)
    ) {
      setActiveFilter(null);
    }
  }, [activeFilter, categoriesWithArticles]);

  const filters: { label: string; value: ArticleCategory | null }[] = [
    { label: "ALL INTELLIGENCE", value: null },
    ...categoriesWithArticles.map((c) => ({ label: c, value: c })),
  ];

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubscribeStatus("loading");
    setSubscribeMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        already?: boolean;
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        setSubscribeStatus("error");
        setSubscribeMessage(data.error || "Unable to subscribe.");
        return;
      }

      setSubscribeStatus("success");
      setSubscribeMessage(
        data.already
          ? "You are already on the briefing list."
          : "You are subscribed to briefings.",
      );
      setEmail("");
      if (!data.already) {
        trackEvent("briefing_subscribe_success");
      }
    } catch {
      setSubscribeStatus("error");
      setSubscribeMessage("Unable to subscribe right now.");
    }
  }

  return (
    <div className="relative flex size-full flex-col items-start bg-[#F4F0EA]">
      {/* Hero */}
      <section className="relative flex w-full flex-col gap-6 px-5 pb-12 pt-16 sm:gap-8 sm:px-8 sm:pb-16 sm:pt-20 lg:gap-10 lg:px-[120px] lg:pb-20 lg:pt-[120px]">
        <div className="relative flex w-full flex-col gap-3 sm:gap-4">
          <p className="w-full font-inter text-[11px] font-medium uppercase leading-normal tracking-[0.04em] text-[#6b665f] sm:text-[13px] lg:text-[14px]">
            SOVEREIGN FORESIGHT / SECURITY TELEMETRY / DEFENSE REPORT
          </p>
          <h1 className="w-full font-eb-garamond text-[clamp(2.5rem,12vw,110px)] font-normal leading-[0.95] text-[#111]">
            Perspectives &amp; Insights
          </h1>
        </div>

        <p className="w-full max-w-[720px] font-eb-garamond text-base font-normal leading-[1.5] text-[#6b665f] sm:text-xl lg:text-2xl">
          We monitor the entire geopolitical field to deliver attribution and
          cyber answers before a nation forms the question. Read our active
          defensive briefs.
        </p>
      </section>

      {isLoading ? (
        <div
          className="flex w-full flex-col items-center justify-center gap-4 px-5 py-24 sm:py-32"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div
            className="size-9 animate-spin rounded-full border-2 border-[#d9d4cb] border-t-[#C6A02C]"
            aria-hidden
          />
          <p className="font-inter text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#6b665f]">
            Loading articles…
          </p>
        </div>
      ) : (
        <>
          {/* Filter pills — horizontal scroll on mobile */}
          <section className="relative flex w-full flex-col gap-5 px-5 pb-8 sm:gap-6 sm:px-8 sm:pb-10 lg:px-[120px] lg:pb-12">
            <div className="relative h-0 w-full shrink-0">
              <div className="absolute inset-x-0 top-[-1px] border-t border-[#1E2124]" />
            </div>

            <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
              {filters.map((f) => {
                const isActive = f.value === activeFilter;
                return (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => setActiveFilter(f.value)}
                    className={
                      isActive
                        ? "flex shrink-0 cursor-pointer items-center rounded-[2px] border border-[#111315] bg-[#111315] px-3 py-2 sm:px-4"
                        : "flex shrink-0 cursor-pointer items-center rounded-[2px] border border-[rgba(107,102,95,0.2)] bg-transparent px-3 py-2 sm:px-4"
                    }
                  >
                    <span
                      className={
                        isActive
                          ? "whitespace-nowrap font-inter text-[11px] font-medium uppercase leading-normal text-[#f3f1ea] sm:text-[12px]"
                          : "whitespace-nowrap font-inter text-[11px] font-medium uppercase leading-normal text-[#6b665f] sm:text-[12px]"
                      }
                    >
                      {f.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Featured card — side-by-side from md+ (laptop same as desktop) */}
          <section className="relative flex w-full flex-col items-start px-5 pb-12 sm:px-8 sm:pb-16 md:px-10 lg:px-16 xl:px-[120px] lg:pb-20">
            <div className="relative w-full overflow-hidden border border-[#1e2124] md:h-[440px] lg:h-[500px] xl:h-[540px]">
              {featured ? (
                <Link
                  href={`/perspectives/${featured.slug}`}
                  className="flex h-full flex-col items-stretch no-underline md:flex-row"
                >
                  <div className="relative h-[200px] w-full shrink-0 sm:h-[280px] md:h-full md:w-[52%] lg:w-[55%] xl:w-[58%]">
                    {featured.cover_image_url ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={featured.cover_image_url}
                          alt={featured.title}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 55vw"
                          unoptimized={featured.cover_image_url.includes(
                            "supabase.co",
                          )}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[rgba(17,19,21,0.2)] mix-blend-multiply" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-[#111]/10" />
                    )}

                    <div className="absolute left-3 top-3 rounded-[2px] bg-[#d7a92c] px-2.5 py-1.5 sm:left-6 sm:top-6 sm:px-3 sm:py-1.5">
                      <p className="whitespace-nowrap font-inter text-[9px] font-extrabold uppercase text-[#111315] sm:text-[11px]">
                        FEATURED INTERCEPT // CLASSIFIED
                      </p>
                    </div>

                    <div className="absolute bottom-3 right-3 flex items-end sm:bottom-6 sm:right-6">
                      <TelemetryStrip h={6} w={18} />
                    </div>
                  </div>

                  <div className="flex h-full min-w-0 flex-1 flex-col justify-between gap-6 p-5 sm:gap-8 sm:p-8 md:p-8 lg:p-10 xl:p-12">
                    <div className="flex flex-col items-start gap-3 sm:gap-4">
                      <p className="whitespace-nowrap font-inter text-[11px] font-extrabold uppercase leading-normal text-[#e83387] sm:text-[12px]">
                        {featured.category}
                      </p>
                      <p className="font-eb-garamond text-[clamp(1.35rem,3.2vw,40px)] font-medium leading-[1.15] text-[#111]">
                        {featured.title}
                      </p>
                      {featured.subtitle ? (
                        <p className="font-eb-garamond text-base font-normal leading-[1.5] text-[#6b665f] sm:text-lg md:text-base lg:text-lg">
                          {featured.subtitle}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div className="flex flex-col items-start gap-1">
                        <p className="font-inter text-[10px] font-normal uppercase text-[#6b665f] sm:text-[11px]">
                          AUTHOR // ANALYST
                        </p>
                        <p className="font-inter text-xs font-medium text-[#111] sm:text-sm">
                          THE HEDGE COLLECTIVE
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-1 sm:items-end">
                        <p className="font-inter text-[10px] font-normal uppercase text-[#6b665f] sm:text-[11px]">
                          PUBLISHED // DELIVERED
                        </p>
                        <p className="font-inter text-xs font-medium text-[#111] sm:text-sm">
                          {formatDate(featured.published_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex h-[200px] items-center justify-center sm:h-[300px] md:h-full">
                  <p className="px-4 text-center font-inter text-sm text-[#6B665F] sm:text-base">
                    No articles in this category yet.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Grid */}
          <section className="relative flex w-full flex-col gap-8 px-5 pb-16 sm:gap-10 sm:px-8 sm:pb-20 lg:gap-12 lg:px-[120px] lg:pb-[120px]">
            <div className="flex w-full items-end justify-between gap-4">
              <p className="font-inter text-xs font-extrabold uppercase text-[#111] sm:text-[16px]">
                ACTIVE INTELLIGENCE Strategic Insights
              </p>
              <div className="hidden sm:block">
                <TelemetryStrip h={8} w={28} />
              </div>
            </div>

            {grid.length > 0 ? (
              <div className="grid w-full grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
                      className="group relative flex min-h-0 flex-col overflow-hidden border border-[#1e2124] no-underline sm:min-h-[480px] lg:min-h-[560px]"
                    >
                      <div className="relative aspect-[16/10] w-full sm:aspect-auto sm:h-[200px] lg:h-[240px]">
                        {article.cover_image_url ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={article.cover_image_url}
                              alt={article.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              unoptimized={article.cover_image_url.includes(
                                "supabase.co",
                              )}
                            />
                            <div className="absolute inset-0 bg-[rgba(17,19,21,0.15)] mix-blend-multiply" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-[#111]/10" />
                        )}

                        <div className="absolute bottom-3 right-3 flex items-end sm:bottom-4 sm:right-4">
                          <TelemetryStrip h={4} w={8} />
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col justify-between gap-6 p-4 sm:p-5 lg:p-6">
                        <div className="flex flex-col items-start gap-2.5 sm:gap-3">
                          <p className="whitespace-nowrap font-inter text-[10px] font-extrabold uppercase text-[#d7a92c] sm:text-[11px]">
                            {article.category}
                          </p>
                          <p className="font-eb-garamond text-xl font-medium leading-[1.2] text-[#111] sm:text-[22px] lg:text-2xl">
                            {article.title}
                          </p>
                          {article.subtitle ? (
                            <p className="line-clamp-3 font-eb-garamond text-sm font-normal leading-[1.4] text-[#6b665f] sm:text-[15px]">
                              {article.subtitle}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex items-end justify-between gap-3">
                          <p className="min-w-0 font-inter text-[9px] font-normal uppercase leading-snug text-[#6b665f] sm:text-[10px]">
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
              <p className="font-inter text-sm text-[#6B665F] sm:text-base">
                No published perspectives yet.
              </p>
            )}
          </section>

          {/* Newsletter */}
          <section className="relative flex w-full flex-col items-start gap-8 bg-[#111315] px-5 pb-12 pt-14 sm:gap-10 sm:px-8 sm:pb-16 sm:pt-20 lg:gap-12 lg:px-[120px] lg:pb-16 lg:pt-24">
            <div className="relative flex w-full flex-col items-start gap-3 sm:gap-4">
              <p className="font-inter text-xs font-extrabold uppercase text-[#d7a92c] sm:text-[14px]">
                COMMUNICATIONS BRIEF
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:gap-16">
              <div className="flex max-w-[760px] flex-col items-start gap-4 text-[#f3f1ea] sm:gap-6">
                <p className="font-eb-garamond text-[clamp(1.75rem,7vw,80px)] font-medium leading-[1.05]">
                  A nation that secures itself keeps its own counsel.
                </p>
                <p className="font-eb-garamond text-base font-normal leading-[1.6] opacity-70 sm:text-lg">
                  Receive the monthly secure terminal briefs directly to your
                  inbox. We analyze regional cyber activity, threat actor
                  groups, and macro infrastructure vulnerabilities. No telemetry
                  logging.
                </p>
              </div>

              <div className="flex w-full flex-1 flex-col gap-5 sm:gap-6">
                <form
                  onSubmit={handleSubscribe}
                  className="flex w-full flex-col gap-5 sm:gap-6"
                >
                  <div className="flex w-full items-center justify-between gap-3 border-b border-white/20 px-0 py-3 sm:px-4 sm:py-3.5">
                    <input
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER SECURE EMAIL ADDRESS"
                      className="w-full min-w-0 bg-transparent font-inter text-xs text-[#f3f1ea] outline-none placeholder:text-[#f3f1ea]/60 sm:text-sm"
                    />
                    <div className="hidden sm:block">
                      <TelemetryStrip h={6} w={18} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={subscribeStatus === "loading"}
                    className="w-full rounded-[2px] bg-[#d7a92c] px-6 py-3.5 text-center disabled:opacity-60 sm:px-8 sm:py-4 sm:text-left"
                  >
                    <span className="font-inter text-xs font-extrabold uppercase text-[#111315] sm:text-[14px]">
                      {subscribeStatus === "loading"
                        ? "SUBMITTING…"
                        : "SUBSCRIBE TO BRIEFINGS"}
                    </span>
                  </button>
                </form>

                {subscribeMessage ? (
                  <p
                    role="status"
                    className={`font-inter text-[11px] sm:text-xs ${
                      subscribeStatus === "error"
                        ? "text-[#ff8f8f]"
                        : "text-[#d7a92c]"
                    }`}
                  >
                    {subscribeMessage}
                  </p>
                ) : (
                  <p className="font-inter text-[10px] text-[#f3f1ea] opacity-40 sm:text-[11px]">
                    SUBMISSION SECURED // AES-256 ENCRYPTED PATHWAY
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
