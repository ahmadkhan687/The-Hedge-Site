"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Article } from "@/lib/articles";
import { createClient } from "@/lib/supabase/client";

type AdminArticlesListProps = {
  articles: Article[];
};

export default function AdminArticlesList({ articles }: AdminArticlesListProps) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((article) => {
      const haystack =
        `${article.title} ${article.subtitle} ${article.slug} ${article.status} ${article.number ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, query]);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete “${title}” permanently?`)) return;

    setBusyId(id);
    setError("");
    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("articles")
      .delete()
      .eq("id", id);
    setBusyId(null);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-inter text-sm font-extrabold uppercase tracking-[0.08em] text-[#C6A02C]">
            Dashboard
          </p>
          <h1 className="font-eb-garamond text-[clamp(2rem,4vw,40px)] font-medium text-[#111]">
            Articles
          </h1>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[240px] sm:items-stretch">
          <label className="w-full">
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="h-11 w-full border-0 border-b border-[#111]/20 bg-transparent font-inter text-base text-[#111] outline-none placeholder:text-[#111]/35 focus:border-[#111]/50"
            />
          </label>
          <Link
            href="/admin/articles/new"
            className="flex h-11 items-center justify-center bg-[#111] px-6 font-inter text-sm font-semibold uppercase tracking-[0.08em] text-[#F4F0EA] no-underline transition-opacity hover:opacity-85"
          >
            New article
          </Link>
        </div>
      </div>

      {error && (
        <p role="alert" className="font-inter text-sm text-[#B3261E]">
          {error}
        </p>
      )}

      {filtered.length === 0 ? (
        <p className="font-inter text-base text-[#6B665F]">
          {query.trim()
            ? "No articles match your search."
            : "No articles yet. Create your first piece to show it on Perspectives."}
        </p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((article, index) => (
            <div key={article.id}>
              <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-[1fr_120px_120px_auto] sm:items-center sm:gap-6">
                <Link
                  href={`/admin/articles/${article.id}`}
                  className="flex flex-col gap-1 no-underline transition-opacity hover:opacity-70"
                >
                  <p className="font-eb-garamond text-xl font-medium text-[#111]">
                    {article.title}
                  </p>
                  <p className="font-inter text-sm text-[#6B665F]">
                    /perspectives/{article.slug}
                  </p>
                </Link>

                <p
                  className={`font-inter text-xs font-extrabold uppercase tracking-[0.08em] ${
                    article.status === "published"
                      ? "text-[#1B7A3D]"
                      : "text-[#8A6A1A]"
                  }`}
                >
                  {article.status}
                </p>

                <p className="font-inter text-sm text-[#6B665F]">
                  {new Date(article.updated_at).toLocaleDateString()}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="font-inter text-xs font-semibold uppercase tracking-[0.06em] text-[#111] no-underline hover:opacity-70"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    disabled={busyId === article.id}
                    onClick={() => handleDelete(article.id, article.title)}
                    className="font-inter text-xs font-semibold uppercase tracking-[0.06em] text-[#B3261E] transition-opacity hover:opacity-70 disabled:opacity-40"
                  >
                    {busyId === article.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
              {index < filtered.length - 1 && (
                <div className="h-px w-full bg-[#111]/[0.08]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
