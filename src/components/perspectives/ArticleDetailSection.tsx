import Image from "next/image";
import Link from "next/link";
import ArticleBody from "@/components/perspectives/ArticleBody";
import ArticleReadProgress from "@/components/perspectives/ArticleReadProgress";
import { formatArticleDate, type Article } from "@/lib/articles";

type ArticleDetailSectionProps = {
  article: Article;
  related?: Article[];
};

export default function ArticleDetailSection({
  article,
  related = [],
}: ArticleDetailSectionProps) {
  const dateLabel = formatArticleDate(article.published_at);
  const readLabel = article.reading_time_minutes
    ? `${article.reading_time_minutes} min read`
    : null;
  const meta = [dateLabel, readLabel].filter(Boolean).join(" · ");

  return (
    <article className="bg-[#F4F0EA]">
      <div className="px-5 pb-16 pt-10 sm:px-8 lg:px-[120px] lg:pb-24 lg:pt-14">
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-8">
          <Link
            href="/perspectives"
            className="font-inter text-xs font-extrabold uppercase tracking-[0.1em] text-[#6B665F] no-underline transition-opacity hover:opacity-70"
          >
            ← Back to Perspectives
          </Link>

          <ArticleReadProgress>
            <header className="flex flex-col gap-5">
              <h1 className="font-eb-garamond text-[clamp(2.25rem,5.5vw,3.5rem)] font-medium leading-[1.12] text-[#111]">
                {article.title}
              </h1>

              {meta ? (
                <p className="font-inter text-xs font-medium uppercase tracking-[0.08em] text-[#6B665F]">
                  {meta}
                </p>
              ) : null}
            </header>

            {article.cover_image_url && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111]/8">
                <Image
                  src={article.cover_image_url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 860px"
                  priority
                  unoptimized={article.cover_image_url.includes("supabase.co")}
                />
              </div>
            )}

            <ArticleBody blocks={article.body} />
          </ArticleReadProgress>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-[#111]/10 px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
            <h2 className="font-eb-garamond text-[clamp(1.75rem,3vw,2.25rem)] font-medium text-[#111]">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/perspectives/${item.slug}`}
                  className="group flex flex-col gap-4 no-underline"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111]/8">
                    {item.cover_image_url ? (
                      <Image
                        src={item.cover_image_url}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized={item.cover_image_url.includes(
                          "supabase.co",
                        )}
                      />
                    ) : null}
                  </div>
                  <p className="font-eb-garamond text-xl font-medium leading-[1.3] text-[#111] transition-opacity group-hover:opacity-70">
                    {item.title}
                  </p>
                  {item.subtitle ? (
                    <p className="font-inter text-sm leading-[1.55] text-[#6B665F]">
                      {item.subtitle}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
