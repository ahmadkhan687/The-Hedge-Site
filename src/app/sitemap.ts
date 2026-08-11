import type { MetadataRoute } from "next";
import { getPublishedArticlesListing } from "@/lib/articles-api";

const SITE_URL = "https://thehedgecollective.co.uk";

const STATIC_PATHS = [
  "/",
  "/about",
  "/domains",
  "/sovereignty",
  "/varro",
  "/perspectives",
  "/request-access",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));

  const articles = await getPublishedArticlesListing();

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/perspectives/${article.slug}`,
    lastModified: article.updated_at
      ? new Date(article.updated_at)
      : article.published_at
        ? new Date(article.published_at)
        : new Date(),
  }));

  return [...staticEntries, ...articleEntries];
}