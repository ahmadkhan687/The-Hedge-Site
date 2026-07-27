import type { Metadata } from "next";
import ArticleEditor from "@/components/admin/ArticleEditor";

export const metadata: Metadata = {
  title: "New Article | Admin",
  robots: { index: false, follow: false },
};

export default function NewArticlePage() {
  return <ArticleEditor mode="create" />;
}
