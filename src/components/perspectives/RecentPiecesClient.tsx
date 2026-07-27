"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatArticleDate, type Article } from "@/lib/articles";

type RecentPiecesClientProps = {
  articles: Article[];
};

export default function RecentPiecesClient({ articles }: RecentPiecesClientProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return articles.slice(0, 5);
    }
    return articles.filter((article) => {
      const haystack = `${article.title} ${article.subtitle} ${article.number ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, query]);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex max-w-[1140px] flex-col gap-8">
        <p className="font-inter text-base font-extrabold uppercase text-[#C6A02C]">
          Recent | Article
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <h2 className="font-eb-garamond text-[clamp(2rem,4vw,56px)] font-medium leading-[1.2] text-[#111]">
            Recent pieces.
          </h2>
          <label className="relative w-full sm:max-w-[280px]">
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="h-11 w-full border-0 border-b border-[#111]/20 bg-transparent font-inter text-base text-[#111] outline-none placeholder:text-[#111]/35 focus:border-[#111]/50"
            />
          </label>
        </div>

        <p className="max-w-[800px] font-inter text-lg font-normal leading-[1.6] text-[#6B665F] sm:text-[22px]">
          We never show whose problem we solved. We show how we think. Judge the
          mind before you trust the hand.
        </p>
      </div>

      <div className="flex flex-col">
        {filtered.length === 0 ? (
          <p className="font-inter text-base text-[#6B665F]">
            {query.trim()
              ? "No articles match your search."
              : "No published pieces yet."}
          </p>
        ) : (
          filtered.map((article, index) => (
            <div key={article.id}>
              <Link
                href={`/perspectives/${article.slug}`}
                className="grid grid-cols-1 gap-3 py-5 no-underline transition-opacity hover:opacity-70 sm:grid-cols-[80px_1fr_auto] sm:items-start sm:gap-6"
              >
                <p className="font-eb-garamond text-xl font-medium text-[#C6A02C]">
                  {article.number ?? String(index + 1).padStart(2, "0")}
                </p>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="font-eb-garamond text-2xl font-medium leading-[1.3] text-[#111]">
                    {article.title}
                  </p>
                  {article.subtitle ? (
                    <p className="font-inter text-base font-normal leading-[1.6] text-[#6B665F] sm:hidden">
                      {article.subtitle}
                    </p>
                  ) : null}
                </div>
                <p className="font-inter text-sm font-medium uppercase tracking-[0.06em] text-[#6B665F] sm:pt-1 sm:text-right">
                  {formatArticleDate(article.published_at) || "—"}
                </p>
              </Link>
              {index < filtered.length - 1 && (
                <div className="h-px w-full bg-[#111]/[0.08]" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
