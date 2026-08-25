/**
 * Allow only safe inline formatting tags from the Word-like editor.
 * Flattens block tags (p/div) so content is safe inside headings/paragraphs.
 */

const ALLOWED_INLINE_TAGS = "b|strong|i|em|br|span|a";

/** Validate and normalize URLs for article body links. */
export function normalizeLinkHref(raw: string): string | null {
  const href = raw.trim();
  if (!href) return null;
  if (/^(javascript|data|vbscript):/i.test(href)) return null;

  if (href.startsWith("/") && !href.startsWith("//")) {
    return /^\/(?!\/)[^<>\s"']*$/.test(href) ? href : null;
  }

  if (/^https?:\/\//i.test(href)) {
    try {
      const url = new URL(href);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.href;
      }
    } catch {
      return null;
    }
  }

  const path = href.replace(/^\/+/, "");
  if (/^[a-z0-9][\w-]*(?:\/[^\s"'<>]*)?$/i.test(path)) {
    return `/${path}`;
  }

  return null;
}

function sanitizeAnchorTags(html: string): string {
  return html.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, (match, inner: string) => {
    const hrefMatch = match.match(/\shref=["']([^"']*)["']/i);
    if (!hrefMatch) return inner;

    const safeHref = normalizeLinkHref(hrefMatch[1]);
    if (!safeHref) return inner;

    const isExternal = /^https?:\/\//i.test(safeHref);
    const target = isExternal ? ' target="_blank"' : "";
    const rel = isExternal ? ' rel="noopener noreferrer"' : "";

    return `<a href="${safeHref}"${target}${rel}>${inner}</a>`;
  });
}

export function sanitizeRichHtml(html: string): string {
  if (!html) return "";

  let clean = html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");

  // Turn block wrappers into line breaks (contentEditable often inserts div/p)
  clean = clean
    .replace(/<\/p>/gi, "<br>")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/div>/gi, "<br>")
    .replace(/<div[^>]*>/gi, "");

  // Keep only inline formatting tags; strip everything else
  clean = clean.replace(
    new RegExp(`<\\/?(?!\\/?(?:${ALLOWED_INLINE_TAGS})\\b)[^>]+>`, "gi"),
    "",
  );

  clean = sanitizeAnchorTags(clean);

  // Collapse trailing breaks / empty content
  clean = clean.replace(/(?:<br\s*\/?>\s*)+$/gi, "").trim();

  if (
    clean.replace(/<br\s*\/?>/gi, "").replace(/&nbsp;/gi, " ").trim() === ""
  ) {
    return "";
  }

  return clean;
}

function looksLikeHtml(text: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(text);
}

export function toDisplayHtml(text: string): string {
  if (!text) return "";
  if (looksLikeHtml(text)) {
    return sanitizeRichHtml(text);
  }

  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");
  html = html.replace(/\n/g, "<br />");
  return html;
}

export const ARTICLE_LINK_STYLES =
  "[&_a]:font-semibold [&_a]:underline [&_a]:decoration-[#C6A02C] [&_a]:decoration-2 [&_a]:underline-offset-2 [&_a]:transition-opacity hover:[&_a]:opacity-70";
