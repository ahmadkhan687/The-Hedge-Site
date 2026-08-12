import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailSection from "@/components/perspectives/ArticleDetailSection";
import {
  getPublishedArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles-api";
import { serializeJsonLd } from "@/lib/json-ld";
import type { Article } from "@/lib/articles";

export const dynamic = "force-dynamic";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function buildArticleJsonLd(article: Article): Record<string, unknown> {
  const canonicalUrl = `https://thehedgecollective.co.uk/perspectives/${article.slug}`;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "The Hedge Collective",
      url: "https://thehedgecollective.co.uk/",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  if (article.subtitle?.trim()) {
    jsonLd.description = article.subtitle.trim();
  }
  if (article.published_at) {
    jsonLd.datePublished = article.published_at;
  }
  if (article.updated_at) {
    jsonLd.dateModified = article.updated_at;
  }
  if (article.cover_image_url) {
    jsonLd.image = article.cover_image_url;
  }
  // author_id alone is not a displayable name — omit rather than invent author info

  return jsonLd;
}

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

  const canonicalUrl = `https://thehedgecollective.co.uk/perspectives/${article.slug}`;

  return {
    title: article.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: canonicalUrl,
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
  const articleJsonLd = buildArticleJsonLd(article);

  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(articleJsonLd),
        }}
      />
      <ArticleDetailSection article={article} related={related} />
    </main>
  );
}
