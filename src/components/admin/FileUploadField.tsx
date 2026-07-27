"use client";

import { useState } from "react";

type FileUploadFieldProps = {
  label?: string;
  accept?: string;
  onFile: (file: File) => void;
  preview?: React.ReactNode;
};

/** File picker that highlights the chosen file name. */
export default function FileUploadField({
  label,
  accept = "image/*",
  onFile,
  preview,
}: FileUploadFieldProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {label ? (
        <p className="font-inter text-xs font-extrabold uppercase tracking-[0.08em] text-[#6B665F]">
          {label}
        </p>
      ) : null}
      <label className="flex cursor-pointer flex-col gap-2">
        <span className="inline-flex w-fit items-center border border-[#111]/25 bg-[#111] px-4 py-2 font-inter text-xs font-semibold uppercase tracking-[0.06em] text-[#F4F0EA]">
          Choose file
        </span>
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setFileName(file.name);
            onFile(file);
          }}
        />
      </label>
      {fileName ? (
        <p className="border border-[#C6A02C] bg-[#C6A02C]/15 px-3 py-2 font-inter text-sm font-medium text-[#111]">
          Selected: <span className="font-semibold">{fileName}</span>
        </p>
      ) : (
        <p className="font-inter text-sm text-[#6B665F]">No file chosen</p>
      )}
      {preview}
    </div>
  );
}
