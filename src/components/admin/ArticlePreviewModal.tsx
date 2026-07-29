"use client";

import Image from "next/image";
import { useEffect } from "react";
import ArticleBody from "@/components/perspectives/ArticleBody";
import { formatArticleDate, type Article } from "@/lib/articles";

type ArticlePreviewModalProps = {
  article: Article;
  onClose: () => void;
};

export default function ArticlePreviewModal({
  article,
  onClose,
}: ArticlePreviewModalProps) {
  const dateLabel = formatArticleDate(article.published_at) || "Draft preview";
  const readLabel = article.reading_time_minutes
    ? `${article.reading_time_minutes} min read`
    : null;
  const meta = [dateLabel, readLabel, article.category]
    .filter(Boolean)
    .join(" · ");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#F4F0EA]"
      role="dialog"
      aria-modal="true"
      aria-label="Article preview"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#111]/10 bg-[#F4F0EA]/95 px-5 py-3 backdrop-blur-sm sm:px-8">
        <div className="flex flex-col gap-0.5">
          <p className="font-inter text-xs font-extrabold uppercase tracking-[0.08em] text-[#C6A02C]">
            Preview
          </p>
          <p className="font-inter text-xs text-[#6B665F]">
            How this article will look on the site. Press Esc to close.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 shrink-0 items-center justify-center border border-[#111]/20 bg-[#111] px-5 font-inter text-xs font-semibold uppercase tracking-[0.08em] text-[#F4F0EA] transition-opacity hover:opacity-85"
        >
          Close preview
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <article className="bg-[#F4F0EA]">
          <div className="px-5 pb-16 pt-10 sm:px-8 lg:px-[120px] lg:pb-24 lg:pt-14">
            <div className="mx-auto flex w-full max-w-[860px] flex-col gap-8">
              <p className="font-inter text-xs font-extrabold uppercase tracking-[0.1em] text-[#6B665F]">
                ← Back to Perspectives
              </p>

              <header className="flex flex-col gap-5">
                <h1 className="font-eb-garamond text-[clamp(2.25rem,5.5vw,3.5rem)] font-medium leading-[1.12] text-[#111]">
                  {article.title.trim() || "Untitled"}
                </h1>

                {meta ? (
                  <p className="font-inter text-xs font-medium uppercase tracking-[0.08em] text-[#6B665F]">
                    {meta}
                  </p>
                ) : null}

                {article.subtitle ? (
                  <p className="font-eb-garamond text-lg leading-[1.5] text-[#6B665F] sm:text-xl">
                    {article.subtitle}
                  </p>
                ) : null}
              </header>

              {article.cover_image_url ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111]/8">
                  <Image
                    src={article.cover_image_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 900px) 100vw, 860px"
                    unoptimized={article.cover_image_url.includes("supabase.co")}
                  />
                </div>
              ) : null}

              <ArticleBody blocks={article.body} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
