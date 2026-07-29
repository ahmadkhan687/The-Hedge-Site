"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ARTICLE_CATEGORIES,
  createBlockId,
  slugify,
  type Article,
  type ArticleBlock,
  type ArticleCategory,
  type ArticleStatus,
  type HeadingBlock,
  type ImageBlock,
  type ListBlock,
  type ListItem,
  type ParagraphBlock,
  type QuoteBlock,
} from "@/lib/articles";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "@/components/admin/RichTextEditor";
import FileUploadField from "@/components/admin/FileUploadField";
import ArticlePreviewModal from "@/components/admin/ArticlePreviewModal";

type ArticleEditorProps = {
  mode: "create" | "edit";
  initial?: Article | null;
};

type FormState = {
  title: string;
  subtitle: string;
  slug: string;
  number: string;
  category: ArticleCategory;
  reading_time_minutes: string;
  cover_image_url: string;
  status: ArticleStatus;
  body: ArticleBlock[];
};

function emptyForm(): FormState {
  return {
    title: "",
    subtitle: "",
    slug: "",
    number: "",
    category: "GEO-STRATEGY",
    reading_time_minutes: "",
    cover_image_url: "",
    status: "draft",
    body: [
      {
        id: createBlockId(),
        type: "paragraph",
        lead: true,
        text: "",
      },
    ],
  };
}

function fromArticle(article: Article): FormState {
  return {
    title: article.title,
    subtitle: article.subtitle,
    slug: article.slug,
    number: article.number ?? "",
    category: article.category,
    reading_time_minutes:
      article.reading_time_minutes != null
        ? String(article.reading_time_minutes)
        : "",
    cover_image_url: article.cover_image_url ?? "",
    status: article.status,
    body:
      article.body.length > 0
        ? article.body
        : [{ id: createBlockId(), type: "paragraph", text: "" }],
  };
}

export default function ArticleEditor({ mode, initial }: ArticleEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() =>
    initial ? fromArticle(initial) : emptyForm(),
  );
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [articleId, setArticleId] = useState<string | null>(initial?.id ?? null);
  const [autoSaveLabel, setAutoSaveLabel] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const notifiedRef = useRef(Boolean(initial?.subscribers_notified_at));

  const formRef = useRef(form);
  const articleIdRef = useRef(articleId);
  const skipNextAutoSave = useRef(true);
  const autoSaveLock = useRef(false);
  const publishedAtRef = useRef(initial?.published_at ?? null);

  formRef.current = form;
  articleIdRef.current = articleId;

  useEffect(() => {
    if (!selectedBlockId && form.body[0]) {
      setSelectedBlockId(form.body[0].id);
    }
  }, [form.body, selectedBlockId]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (previewOpen) return;
      if (!selectedBlockId) return;
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

      const target = e.target as HTMLElement | null;
      const typingInField =
        !!target?.closest('[contenteditable="true"]') ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (typingInField && !e.altKey) return;

      e.preventDefault();
      moveBlock(selectedBlockId, e.key === "ArrowUp" ? -1 : 1);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedBlockId, form.body, previewOpen]);

  const canSave = useMemo(
    () => form.title.trim().length > 0 && form.slug.trim().length > 0,
    [form.title, form.slug],
  );

  const previewArticle = useMemo((): Article => {
    const reading = form.reading_time_minutes.trim()
      ? Number(form.reading_time_minutes)
      : null;

    return {
      id: articleId ?? "preview",
      number: form.number.trim() || null,
      slug: slugify(form.slug || form.title) || "preview",
      title: form.title.trim() || "Untitled",
      subtitle: form.subtitle.trim(),
      category: form.category,
      reading_time_minutes:
        reading != null && !Number.isNaN(reading) ? reading : null,
      cover_image_url: form.cover_image_url.trim() || null,
      body: form.body,
      status: form.status,
      author_id: initial?.author_id ?? null,
      published_at: publishedAtRef.current ?? new Date().toISOString(),
      subscribers_notified_at: initial?.subscribers_notified_at ?? null,
      created_at: initial?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }, [form, articleId, initial]);

  function buildPayload(
    current: FormState,
    userId: string,
    existingAuthorId?: string | null,
  ) {
    const reading = current.reading_time_minutes.trim()
      ? Number(current.reading_time_minutes)
      : null;

    return {
      title: current.title.trim() || "Untitled",
      subtitle: current.subtitle.trim(),
      slug: slugify(current.slug || current.title),
      number: current.number.trim() || null,
      category: current.category,
      reading_time_minutes:
        reading != null && !Number.isNaN(reading) ? reading : null,
      cover_image_url: current.cover_image_url.trim() || null,
      body: current.body,
      status: current.status,
      published_at:
        current.status === "published"
          ? (publishedAtRef.current ?? new Date().toISOString())
          : null,
      author_id: existingAuthorId ?? userId,
      updated_at: new Date().toISOString(),
    };
  }

  async function persistArticle(options?: {
    manual?: boolean;
    forceStatus?: ArticleStatus;
  }) {
    const current = formRef.current;
    const title = current.title.trim();
    const slug = slugify(current.slug || current.title);

    if (!title || !slug) {
      return { ok: false as const, error: "Title and slug are required." };
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { ok: false as const, error: "You must be signed in." };
    }

    const payload = buildPayload(
      {
        ...current,
        slug,
        status: options?.forceStatus ?? current.status,
      },
      user.id,
      initial?.author_id,
    );

    if (payload.status === "published" && !publishedAtRef.current) {
      publishedAtRef.current = payload.published_at;
    }

    const id = articleIdRef.current;

    if (!id) {
      const { data, error: insertError } = await supabase
        .from("articles")
        .insert(payload)
        .select("id")
        .single();

      if (insertError || !data) {
        return {
          ok: false as const,
          error: insertError?.message ?? "Failed to create article",
        };
      }

      setArticleId(data.id);
      articleIdRef.current = data.id;
      skipNextAutoSave.current = true;
      if (options?.manual) {
        router.replace(`/admin/articles/${data.id}`);
      }

      const notify = await maybeNotifySubscribers({
        id: data.id,
        slug: payload.slug,
        title: payload.title,
        subtitle: payload.subtitle,
        status: payload.status,
      });

      return {
        ok: true as const,
        id: data.id,
        created: true,
        notifyMessage: notify,
      };
    }

    const { error: updateError } = await supabase
      .from("articles")
      .update(payload)
      .eq("id", id);

    if (updateError) {
      return { ok: false as const, error: updateError.message };
    }

    const notify = await maybeNotifySubscribers({
      id,
      slug: payload.slug,
      title: payload.title,
      subtitle: payload.subtitle,
      status: payload.status,
    });

    return {
      ok: true as const,
      id,
      created: false,
      notifyMessage: notify,
    };
  }

  async function maybeNotifySubscribers(article: {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    status: ArticleStatus;
  }): Promise<string | null> {
    if (article.status !== "published" || notifiedRef.current) {
      return null;
    }

    try {
      const res = await fetch("/api/notify-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: article.id,
          slug: article.slug,
          title: article.title,
          subtitle: article.subtitle,
        }),
      });
      const data = (await res.json()) as {
        sent?: number;
        skipped?: boolean;
        reason?: string;
        warning?: string;
        error?: string;
      };

      if (!res.ok) {
        return data.error
          ? `Published, but email failed: ${data.error}`
          : "Published, but subscriber email failed.";
      }

      // Don't lock retries if Resend isn't configured yet
      if (data.reason !== "not_configured") {
        notifiedRef.current = true;
      }

      if (data.reason === "not_configured") {
        return `Published. ${data.warning}`;
      }

      if (data.reason === "already_notified" || data.skipped) {
        return "Published.";
      }

      if (data.reason === "no_subscribers" || (data.sent ?? 0) === 0) {
        return "Published. No subscribers to notify yet.";
      }

      return data.warning
        ? `Published. Notified ${data.sent} subscribers. ${data.warning}`
        : `Published. Notified ${data.sent} subscribers.`;
    } catch {
      return "Published, but subscriber email could not be sent.";
    }
  }

  // Auto-save shortly after any change
  useEffect(() => {
    if (skipNextAutoSave.current) {
      skipNextAutoSave.current = false;
      return;
    }

    const title = form.title.trim();
    const slug = form.slug.trim();
    if (!title || !slug) return;
    if (autoSaveLock.current || saving) return;

    const timer = window.setTimeout(async () => {
      if (autoSaveLock.current) return;
      autoSaveLock.current = true;
      setAutoSaveLabel("Saving…");

      const result = await persistArticle({
        forceStatus:
          formRef.current.status === "published" ? "published" : "draft",
      });

      autoSaveLock.current = false;

      if (!result.ok) {
        setAutoSaveLabel("");
        setError(result.error);
        return;
      }

      setError("");
      if (result.notifyMessage) {
        setAutoSaveLabel(result.notifyMessage);
      } else {
        setAutoSaveLabel(
          formRef.current.status === "published" ? "Saved" : "Draft saved",
        );
      }
      window.setTimeout(() => setAutoSaveLabel(""), 3500);
    }, 1200);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce on form only
  }, [form, saving]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  }

  function updateBlock(id: string, patch: Partial<ArticleBlock>) {
    setForm((prev) => ({
      ...prev,
      body: prev.body.map((block) =>
        block.id === id ? ({ ...block, ...patch } as ArticleBlock) : block,
      ),
    }));
  }

  function updateListItem(
    blockId: string,
    itemId: string,
    patch: Partial<ListItem>,
  ) {
    setForm((prev) => ({
      ...prev,
      body: prev.body.map((block) => {
        if (block.id !== blockId || block.type !== "list") return block;
        return {
          ...block,
          items: block.items.map((item) =>
            item.id === itemId ? { ...item, ...patch } : item,
          ),
        };
      }),
    }));
  }

  function addListItem(blockId: string) {
    setForm((prev) => ({
      ...prev,
      body: prev.body.map((block) => {
        if (block.id !== blockId || block.type !== "list") return block;
        return {
          ...block,
          items: [
            ...block.items,
            { id: createBlockId(), title: "", text: "" },
          ],
        };
      }),
    }));
  }

  function removeListItem(blockId: string, itemId: string) {
    setForm((prev) => ({
      ...prev,
      body: prev.body.map((block) => {
        if (block.id !== blockId || block.type !== "list") return block;
        const items =
          block.items.length <= 1
            ? block.items
            : block.items.filter((item) => item.id !== itemId);
        return { ...block, items };
      }),
    }));
  }

  function removeBlock(id: string) {
    setForm((prev) => {
      const nextBody =
        prev.body.length <= 1
          ? prev.body
          : prev.body.filter((block) => block.id !== id);
      return { ...prev, body: nextBody };
    });
    setSelectedBlockId((current) => (current === id ? null : current));
  }

  function moveBlock(id: string, direction: -1 | 1) {
    setForm((prev) => {
      const index = prev.body.findIndex((b) => b.id === id);
      const next = index + direction;
      if (index < 0 || next < 0 || next >= prev.body.length) return prev;
      const body = [...prev.body];
      const [item] = body.splice(index, 1);
      body.splice(next, 0, item);
      return { ...prev, body };
    });
  }

  function addBlock(type: ArticleBlock["type"]) {
    let block: ArticleBlock;
    if (type === "heading") {
      block = { id: createBlockId(), type: "heading", level: 2, text: "" };
    } else if (type === "image") {
      block = { id: createBlockId(), type: "image", url: "", alt: "" };
    } else if (type === "quote") {
      block = { id: createBlockId(), type: "quote", text: "", citation: "" };
    } else if (type === "list") {
      block = {
        id: createBlockId(),
        type: "list",
        items: [{ id: createBlockId(), title: "", text: "" }],
      };
    } else {
      block = { id: createBlockId(), type: "paragraph", text: "" };
    }

    setForm((prev) => ({ ...prev, body: [...prev.body, block] }));
    setSelectedBlockId(block.id);
  }

  async function uploadImage(file: File): Promise<string | null> {
    setUploading(true);
    setError("");
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    setUploading(false);

    if (uploadError) {
      setError(uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from("article-images").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleImageUpload(
    file: File,
    onUrl: (url: string) => void,
  ) {
    const url = await uploadImage(file);
    if (url) onUrl(url);
  }

  async function handleSave() {
    if (!canSave) return;
    setSaving(true);
    setError("");
    setMessage("");
    autoSaveLock.current = true;

    const result = await persistArticle({ manual: true });

    autoSaveLock.current = false;
    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setMessage(
      result.notifyMessage ||
        (form.status === "published" ? "Article published." : "Draft saved."),
    );
    setAutoSaveLabel("");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial || mode !== "edit") return;
    if (!window.confirm("Delete this article permanently?")) return;

    setSaving(true);
    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("articles")
      .delete()
      .eq("id", initial.id);
    setSaving(false);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-inter text-sm font-extrabold uppercase tracking-[0.08em] text-[#C6A02C]">
            {mode === "create" && !articleId ? "New article" : "Edit article"}
          </p>
          {autoSaveLabel ? (
            <p className="font-inter text-xs font-medium uppercase tracking-[0.06em] text-[#1B7A3D]">
              {autoSaveLabel}
            </p>
          ) : null}
        </div>
        <h1 className="font-eb-garamond text-[clamp(2rem,4vw,40px)] font-medium text-[#111]">
          {form.title.trim() || "Untitled"}
        </h1>
        <p className="font-inter text-xs text-[#6B665F]">
          Changes auto-save as a draft while you type. Slug stays short for the
          URL.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title">
          <input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClass}
            placeholder="Article title"
          />
        </Field>
        <Field label="Slug (URL)">
          <input
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              updateField("slug", e.target.value);
            }}
            className={inputClass}
            placeholder="article-url-slug"
          />
        </Field>
        <Field label="Subtitle / excerpt">
          <input
            value={form.subtitle}
            onChange={(e) => updateField("subtitle", e.target.value)}
            className={inputClass}
            placeholder="Short line for list cards"
          />
        </Field>
        <Field label="Reading time (minutes)">
          <input
            value={form.reading_time_minutes}
            onChange={(e) => updateField("reading_time_minutes", e.target.value)}
            className={inputClass}
            placeholder="12"
            inputMode="numeric"
          />
        </Field>
        <Field label="Number (optional)">
          <input
            value={form.number}
            onChange={(e) => updateField("number", e.target.value)}
            className={inputClass}
            placeholder="01"
          />
        </Field>
        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) =>
              updateField("category", e.target.value as ArticleCategory)
            }
            className={inputClass}
          >
            {ARTICLE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            value={form.status}
            onChange={(e) =>
              updateField("status", e.target.value as ArticleStatus)
            }
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
      </div>

      <Field label="Hero / cover image">
        <FileUploadField
          onFile={(file) =>
            handleImageUpload(file, (url) => updateField("cover_image_url", url))
          }
          preview={
            form.cover_image_url ? (
              <div className="relative aspect-[16/9] w-full max-w-xl overflow-hidden border border-[#C6A02C]/40 bg-[#111]/5">
                <Image
                  src={form.cover_image_url}
                  alt="Cover"
                  fill
                  className="object-cover"
                  sizes="600px"
                  unoptimized
                />
              </div>
            ) : null
          }
        />
      </Field>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-inter text-sm font-extrabold uppercase tracking-[0.08em] text-[#111]">
              Body blocks
            </p>
            <p className="font-inter text-xs text-[#6B665F]">
              Click a block to select it. Move with ↑ ↓ keys, Alt+↑ / Alt+↓
              while typing, or the Move up / Move down buttons.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AddButton onClick={() => addBlock("heading")}>+ Heading</AddButton>
            <AddButton onClick={() => addBlock("paragraph")}>
              + Paragraph
            </AddButton>
            <AddButton onClick={() => addBlock("quote")}>+ Quote</AddButton>
            <AddButton onClick={() => addBlock("list")}>+ List</AddButton>
            <AddButton onClick={() => addBlock("image")}>+ Image</AddButton>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {form.body.map((block, index) => {
            const selected = selectedBlockId === block.id;

            return (
              <div
                key={block.id}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  setSelectedBlockId(block.id);
                  // Focus the block shell so ↑↓ work (unless clicking inside an editor)
                  const target = e.target as HTMLElement;
                  const typing =
                    target.closest('[contenteditable="true"]') ||
                    target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.tagName === "SELECT" ||
                    target.tagName === "BUTTON";
                  if (!typing) {
                    (e.currentTarget as HTMLDivElement).focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedBlockId(block.id);
                    moveBlock(block.id, -1);
                    return;
                  }
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedBlockId(block.id);
                    moveBlock(block.id, 1);
                    return;
                  }
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedBlockId(block.id);
                  }
                }}
                className={`cursor-pointer border p-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A02C]/40 ${
                  selected
                    ? "border-[#C6A02C] bg-[#C6A02C]/10"
                    : "border-[#111]/10 bg-white/40 hover:border-[#111]/25"
                }`}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-inter text-xs font-extrabold uppercase tracking-[0.08em] text-[#6B665F]">
                    {blockLabel(block)} · {index + 1}
                    {selected ? " · Selected" : ""}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <MoveButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlockId(block.id);
                        moveBlock(block.id, -1);
                      }}
                      disabled={index === 0}
                    >
                      Move up
                    </MoveButton>
                    <MoveButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlockId(block.id);
                        moveBlock(block.id, 1);
                      }}
                      disabled={index === form.body.length - 1}
                    >
                      Move down
                    </MoveButton>
                    <SmallButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBlock(block.id);
                      }}
                    >
                      Remove
                    </SmallButton>
                  </div>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  {block.type === "heading" && (
                    <div className="flex flex-col gap-3">
                      <select
                        value={(block as HeadingBlock).level}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            level: Number(e.target.value) as 2 | 3,
                          })
                        }
                        className={inputClass}
                      >
                        <option value={2}>H2</option>
                        <option value={3}>H3</option>
                      </select>
                      <RichTextEditor
                        value={(block as HeadingBlock).text}
                        onChange={(value) =>
                          updateBlock(block.id, { text: value })
                        }
                        className={inputClass}
                        placeholder="Heading text"
                        minHeight={48}
                      />
                    </div>
                  )}

                  {block.type === "paragraph" && (
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-2 font-inter text-xs uppercase tracking-[0.06em] text-[#6B665F]">
                        <input
                          type="checkbox"
                          checked={Boolean((block as ParagraphBlock).lead)}
                          onChange={(e) =>
                            updateBlock(block.id, { lead: e.target.checked })
                          }
                        />
                        Lead / intro paragraph (larger text)
                      </label>
                      <RichTextEditor
                        value={(block as ParagraphBlock).text}
                        onChange={(value) =>
                          updateBlock(block.id, { text: value })
                        }
                        className={inputClass}
                        placeholder="Write body text…"
                        minHeight={140}
                      />
                    </div>
                  )}

                  {block.type === "quote" && (
                    <div className="flex flex-col gap-3">
                      <RichTextEditor
                        value={(block as QuoteBlock).text}
                        onChange={(value) =>
                          updateBlock(block.id, { text: value })
                        }
                        className={inputClass}
                        placeholder="Quote text"
                        minHeight={110}
                      />
                      <input
                        value={(block as QuoteBlock).citation ?? ""}
                        onChange={(e) =>
                          updateBlock(block.id, { citation: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Citation (optional)"
                      />
                    </div>
                  )}

                  {block.type === "list" && (
                    <div className="flex flex-col gap-4">
                      {(block as ListBlock).items.map((item, itemIndex) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-2 border border-[#111]/8 p-3"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-inter text-[11px] font-extrabold uppercase text-[#6B665F]">
                              Item {itemIndex + 1}
                            </p>
                            <SmallButton
                              onClick={() => removeListItem(block.id, item.id)}
                            >
                              Remove
                            </SmallButton>
                          </div>
                          <RichTextEditor
                            value={item.title}
                            onChange={(value) =>
                              updateListItem(block.id, item.id, {
                                title: value,
                              })
                            }
                            className={inputClass}
                            placeholder="Bold title"
                            minHeight={44}
                          />
                          <RichTextEditor
                            value={item.text}
                            onChange={(value) =>
                              updateListItem(block.id, item.id, {
                                text: value,
                              })
                            }
                            className={inputClass}
                            placeholder="Description after the dash"
                            minHeight={80}
                          />
                        </div>
                      ))}
                      <AddButton onClick={() => addListItem(block.id)}>
                        + List item
                      </AddButton>
                    </div>
                  )}

                  {block.type === "image" && (
                    <div className="flex flex-col gap-3">
                      <FileUploadField
                        onFile={(file) =>
                          handleImageUpload(file, (url) =>
                            updateBlock(block.id, { url }),
                          )
                        }
                        preview={
                          (block as ImageBlock).url ? (
                            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#C6A02C]/40 bg-[#111]/5">
                              <Image
                                src={(block as ImageBlock).url}
                                alt={(block as ImageBlock).alt || "Block image"}
                                fill
                                className="object-cover"
                                sizes="800px"
                                unoptimized
                              />
                            </div>
                          ) : null
                        }
                      />
                      <input
                        value={(block as ImageBlock).alt}
                        onChange={(e) =>
                          updateBlock(block.id, { alt: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Alt text"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {uploading && (
        <p className="font-inter text-sm text-[#6B665F]">Uploading image…</p>
      )}
      {error && (
        <p role="alert" className="font-inter text-sm text-[#B3261E]">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="font-inter text-sm text-[#111]">
          {message}
        </p>
      )}

      <div className="flex flex-wrap gap-3 border-t border-[#111]/10 pt-6">
        <button
          type="button"
          disabled={!canSave || saving}
          onClick={handleSave}
          className="flex h-12 items-center justify-center bg-[#111] px-8 font-inter text-sm font-semibold uppercase tracking-[0.08em] text-[#F4F0EA] transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {saving
            ? "Saving…"
            : form.status === "published"
              ? "Save & publish"
              : "Save draft"}
        </button>

        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="flex h-12 items-center justify-center border border-[#111]/25 bg-transparent px-6 font-inter text-sm font-semibold uppercase tracking-[0.08em] text-[#111] transition-opacity hover:opacity-70"
        >
          Preview
        </button>

        {mode === "edit" && (
          <button
            type="button"
            disabled={saving}
            onClick={handleDelete}
            className="flex h-12 items-center justify-center border border-[#B3261E]/40 px-6 font-inter text-sm font-semibold uppercase tracking-[0.08em] text-[#B3261E] transition-opacity hover:opacity-85 disabled:opacity-60"
          >
            Delete
          </button>
        )}
      </div>

      {previewOpen ? (
        <ArticlePreviewModal
          article={previewArticle}
          onClose={() => setPreviewOpen(false)}
        />
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full border-0 border-b border-[#111]/15 bg-transparent py-3 font-inter text-base text-[#111] outline-none focus:border-[#111]/40";

function blockLabel(block: ArticleBlock): string {
  if (block.type === "heading") return `Heading H${block.level}`;
  if (block.type === "quote") return "Quote box";
  if (block.type === "list") return "List";
  if (block.type === "image") return "Image";
  if (block.type === "paragraph" && block.lead) return "Lead paragraph";
  return "Paragraph";
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-inter text-xs font-extrabold uppercase tracking-[0.08em] text-[#6B665F]">
        {label}
      </label>
      {children}
    </div>
  );
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-[#111]/20 px-3 py-1.5 font-inter text-xs font-semibold uppercase tracking-[0.06em] text-[#111] transition-opacity hover:opacity-70"
    >
      {children}
    </button>
  );
}

function SmallButton({
  onClick,
  disabled,
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="font-inter text-xs font-medium uppercase tracking-[0.06em] text-[#111]/70 transition-opacity hover:opacity-70 disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function MoveButton({
  onClick,
  disabled,
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="border border-[#111]/25 bg-[#111] px-3 py-1.5 font-inter text-xs font-semibold uppercase tracking-[0.06em] text-[#F4F0EA] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}
