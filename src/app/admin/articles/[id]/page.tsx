import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { getAdminArticleById } from "@/lib/articles-api";

export const dynamic = "force-dynamic";

type EditArticlePageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit Article | Admin",
  robots: { index: false, follow: false },
};

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const article = await getAdminArticleById(id);

  if (!article) {
    notFound();
  }

  return <ArticleEditor mode="edit" initial={article} />;
}
