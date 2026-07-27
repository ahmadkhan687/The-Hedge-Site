import { getPublishedArticles } from "@/lib/articles-api";
import PerspectivesBlogClient from "@/components/perspectives/PerspectivesBlogClient";

export default async function PerspectivesMainBlogListingSection() {
  const articles = await getPublishedArticles();

  return <PerspectivesBlogClient articles={articles} />;
}
