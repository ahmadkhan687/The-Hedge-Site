"use client";

import { useEffect, useRef, useState } from "react";
import { normalizeLinkHref, sanitizeRichHtml } from "@/lib/rich-text";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: number;
};

/** Word-like editor: select text, then Bold / Italic / Link. Stores HTML. */
export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className = "",
  minHeight = 120,
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el || document.activeElement === el) return;
    const next = value || "";
    if (el.innerHTML !== next) {
      el.innerHTML = next;
    }
  }, [value]);

  function emitRaw() {
    const el = ref.current;
    if (!el) return;
    onChange(el.innerHTML);
  }

  function emitClean() {
    const el = ref.current;
    if (!el) return;
    const clean = sanitizeRichHtml(el.innerHTML);
    if (el.innerHTML !== clean) {
      el.innerHTML = clean;
    }
    onChange(clean);
  }

  function format(command: "bold" | "italic") {
    ref.current?.focus();
    document.execCommand(command, false);
    emitRaw();
  }

  function openLinkInput() {
    ref.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setLinkError("Select text first, then add a link.");
      setLinkOpen(true);
      return;
    }
    setLinkError("");
    setLinkOpen(true);
  }

  function applyLink() {
    const normalized = normalizeLinkHref(linkUrl);
    if (!normalized) {
      setLinkError("Enter a valid path (/varro) or URL (https://…).");
      return;
    }

    ref.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setLinkError("Select text first, then add a link.");
      return;
    }

    document.execCommand("createLink", false, normalized);
    emitClean();
    setLinkOpen(false);
    setLinkUrl("");
    setLinkError("");
  }

  function cancelLink() {
    setLinkOpen(false);
    setLinkUrl("");
    setLinkError("");
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => format("bold")}
          className="border border-[#111]/20 px-2.5 py-1 font-inter text-xs font-bold text-[#111] transition-opacity hover:opacity-70"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => format("italic")}
          className="border border-[#111]/20 px-2.5 py-1 font-inter text-xs italic text-[#111] transition-opacity hover:opacity-70"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={openLinkInput}
          className="border border-[#111]/20 px-2.5 py-1 font-inter text-xs font-semibold text-[#111] underline decoration-[#C6A02C] underline-offset-2 transition-opacity hover:opacity-70"
          title="Link"
        >
          Link
        </button>
        <span className="font-inter text-[10px] uppercase tracking-[0.06em] text-[#6B665F]">
          Select text → Bold / Italic / Link
        </span>
      </div>

      {linkOpen ? (
        <div className="flex flex-col gap-2 border border-[#111]/15 bg-[#F4F0EA] p-3">
          <label className="font-inter text-[10px] font-extrabold uppercase tracking-[0.06em] text-[#6B665F]">
            Link URL
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => {
                setLinkUrl(e.target.value);
                setLinkError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyLink();
                }
                if (e.key === "Escape") cancelLink();
              }}
              placeholder="/varro or https://example.com"
              className="min-w-[220px] flex-1 border border-[#111]/20 bg-white px-3 py-2 font-inter text-sm text-[#111] outline-none focus:border-[#111]/40"
            />
            <button
              type="button"
              onClick={applyLink}
              className="border border-[#111] bg-[#111] px-3 py-2 font-inter text-xs font-semibold uppercase tracking-[0.06em] text-white transition-opacity hover:opacity-85"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={cancelLink}
              className="border border-[#111]/20 px-3 py-2 font-inter text-xs font-semibold uppercase tracking-[0.06em] text-[#111] transition-opacity hover:opacity-70"
            >
              Cancel
            </button>
          </div>
          {linkError ? (
            <p className="font-inter text-xs text-[#B3261E]">{linkError}</p>
          ) : (
            <p className="font-inter text-xs text-[#6B665F]">
              Internal: /varro, /domains, /perspectives/your-slug
            </p>
          )}
        </div>
      ) : null}

      <div className="relative">
        {!value && placeholder ? (
          <span className="pointer-events-none absolute left-0 top-3 font-inter text-base text-[#111]/35">
            {placeholder}
          </span>
        ) : null}
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          onInput={emitRaw}
          onBlur={emitClean}
          className={`${className} outline-none [&_a]:font-semibold [&_a]:text-[#111] [&_a]:underline [&_a]:decoration-[#C6A02C] [&_a]:underline-offset-2`}
          style={{ minHeight }}
        />
      </div>
    </div>
  );
}
