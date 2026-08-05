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

  const description = article.subtitle || article.title;
  const defaultShareImage =
    "https://thehedgecollective.co.uk/og/share-og.png?v=2";
  const shareImage = article.cover_image_url ?? defaultShareImage;

  return {
    title: article.title,
    description,
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: `https://thehedgecollective.co.uk/perspectives/${article.slug}`,
      images: [{ url: shareImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [{ url: shareImage }],
    },
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
