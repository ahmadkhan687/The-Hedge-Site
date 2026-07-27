"use client";

import { useEffect, useRef } from "react";
import { sanitizeRichHtml } from "@/lib/rich-text";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: number;
};

/** Word-like editor: select text, then Bold / Italic. Stores HTML. */
export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className = "",
  minHeight = 120,
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
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
        <span className="self-center font-inter text-[10px] uppercase tracking-[0.06em] text-[#6B665F]">
          Select text → Bold / Italic
        </span>
      </div>

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
          className={`${className} outline-none`}
          style={{ minHeight }}
        />
      </div>
    </div>
  );
}
