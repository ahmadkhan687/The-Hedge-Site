export type HeadingBlock = {
  id: string;
  type: "heading";
  level: 2 | 3;
  text: string;
};

export type ParagraphBlock = {
  id: string;
  type: "paragraph";
  /** Larger intro paragraph under the hero */
  lead?: boolean;
  text: string;
};

export type ImageBlock = {
  id: string;
  type: "image";
  url: string;
  alt: string;
};

export type QuoteBlock = {
  id: string;
  type: "quote";
  text: string;
  citation?: string;
};

export type ListItem = {
  id: string;
  title: string;
  text: string;
};

export type ListBlock = {
  id: string;
  type: "list";
  items: ListItem[];
};

export type ArticleBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | QuoteBlock
  | ListBlock;

export type ArticleStatus = "draft" | "published";

export type Article = {
  id: string;
  number: string | null;
  slug: string;
  title: string;
  subtitle: string;
  reading_time_minutes: number | null;
  cover_image_url: string | null;
  body: ArticleBlock[];
  status: ArticleStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleInput = {
  number?: string | null;
  slug: string;
  title: string;
  subtitle?: string;
  reading_time_minutes?: number | null;
  cover_image_url?: string | null;
  body: ArticleBlock[];
  status: ArticleStatus;
  published_at?: string | null;
};

export function createBlockId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function slugify(value: string, maxWords = 3): string {
  const words = value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .filter(Boolean)
    .slice(0, maxWords);

  return words.join("-");
}

export function formatArticleDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
