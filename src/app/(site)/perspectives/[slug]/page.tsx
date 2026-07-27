import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailSection from "@/components/perspectives/ArticleDetailSection";
import {
  getPublishedArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles-api";

export const dynamic = "force-dynamic";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    return { title: "Article | The Hedge Collective" };
  }

  return {
    title: `${article.title} | The Hedge Collective`,
    description: article.subtitle || article.title,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await getRelatedArticles(slug, 3);

  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <ArticleDetailSection article={article} related={related} />
    </main>
  );
}
