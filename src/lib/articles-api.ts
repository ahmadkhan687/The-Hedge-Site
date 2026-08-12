import type { Article, ArticleBlock, ArticleCategory, ArticleInput } from "@/lib/articles";
import { normalizeCategory } from "@/lib/articles";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";

function parseBody(value: unknown): ArticleBlock[] {
  if (!Array.isArray(value)) return [];
  return value as ArticleBlock[];
}

function parseCategory(value: unknown): ArticleCategory {
  if (typeof value === "string" && value.trim()) {
    return normalizeCategory(value);
  }
  return "GEO-STRATEGY";
}

function mapRow(row: Record<string, unknown>): Article {
  return {
    id: String(row.id),
    number: (row.number as string | null) ?? null,
    slug: String(row.slug),
    title: String(row.title),
    subtitle: String(row.subtitle ?? ""),
    category: parseCategory(row.category),
    reading_time_minutes:
      typeof row.reading_time_minutes === "number"
        ? row.reading_time_minutes
        : row.reading_time_minutes
          ? Number(row.reading_time_minutes)
          : null,
    cover_image_url: (row.cover_image_url as string | null) ?? null,
    body: parseBody(row.body),
    status: row.status === "published" ? "published" : "draft",
    author_id: (row.author_id as string | null) ?? null,
    published_at: (row.published_at as string | null) ?? null,
    subscribers_notified_at:
      (row.subscribers_notified_at as string | null) ?? null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export async function getPublishedArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data) {
    console.error("getPublishedArticles:", error?.message);
    return [];
  }

  return data.map((row) => mapRow(row as Record<string, unknown>));
}

/** Listing cards only — skips heavy `body` JSON for faster Perspectives page load. */
export async function getPublishedArticlesListing(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, number, slug, title, subtitle, category, reading_time_minutes, cover_image_url, status, author_id, published_at, subscribers_notified_at, created_at, updated_at",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data) {
    console.error("getPublishedArticlesListing:", error?.message);
    return [];
  }

  return data.map((row) =>
    mapRow({ ...(row as Record<string, unknown>), body: [] }),
  );
}

export async function getPublishedArticleBySlug(
  slug: string,
): Promise<Article | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getPublishedArticleBySlug:", error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  return mapRow(data as Record<string, unknown>);
}

export async function getRelatedArticles(
  currentSlug: string,
  limit = 3,
): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.slug !== currentSlug).slice(0, limit);
}

export async function getAllAdminArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error || !data) {
    console.error("getAllAdminArticles:", error?.message);
    return [];
  }

  return data.map((row) => mapRow(row as Record<string, unknown>));
}

export async function getAdminArticleById(
  id: string,
): Promise<Article | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    console.error("getAdminArticleById:", error?.message);
    return null;
  }

  return mapRow(data as Record<string, unknown>);
}

export async function createArticle(
  input: ArticleInput,
  authorId: string,
): Promise<{ article: Article | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .insert({
      ...input,
      category: normalizeCategory(input.category ?? "GEO-STRATEGY") || "GEO-STRATEGY",
      author_id: authorId,
      published_at:
        input.status === "published"
          ? (input.published_at ?? new Date().toISOString())
          : null,
    })
    .select("*")
    .single();

  if (error || !data) {
    return { article: null, error: error?.message ?? "Failed to create article" };
  }

  return { article: mapRow(data as Record<string, unknown>), error: null };
}

export async function updateArticle(
  id: string,
  input: ArticleInput,
): Promise<{ article: Article | null; error: string | null }> {
  const supabase = await createClient();

  const payload: Record<string, unknown> = {
    number: input.number ?? null,
    slug: input.slug,
    title: input.title,
    subtitle: input.subtitle ?? "",
    category: normalizeCategory(input.category ?? "GEO-STRATEGY") || "GEO-STRATEGY",
    reading_time_minutes: input.reading_time_minutes ?? null,
    cover_image_url: input.cover_image_url ?? null,
    body: input.body,
    status: input.status,
  };

  if (input.status === "published") {
    payload.published_at = input.published_at ?? new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("articles")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return { article: null, error: error?.message ?? "Failed to update article" };
  }

  return { article: mapRow(data as Record<string, unknown>), error: null };
}

export async function deleteArticle(
  id: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  return { error: error?.message ?? null };
}
