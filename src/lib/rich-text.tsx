/**
 * Allow only safe inline formatting tags from the Word-like editor.
 * Flattens block tags (p/div) so content is safe inside headings/paragraphs.
 */
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
    /<\/?(?!\/?(?:b|strong|i|em|br|span)\b)[^>]+>/gi,
    "",
  );

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
