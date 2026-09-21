"use client";

import Link from "next/link";
import { useState } from "react";
import { STUDY_PAGE_PATH } from "@/lib/study-constants";

const DOWNLOAD_HREF =
  "/api/study/pakistan-administrative-geography/download";
const EMAIL_API =
  "/api/study/pakistan-administrative-geography/email";

const inputClass =
  "w-full border border-[#0C0C0C]/25 bg-transparent px-4 py-3 font-inter text-sm text-[#0C0C0C] outline-none placeholder:text-[#746F67] focus:border-[#0C0C0C]";

export default function StudyDownloadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  function resetMessage() {
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(EMAIL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email,
          contact: contact.trim(),
          country: country.trim(),
        }),
      });
      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Unable to send the PDF.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "PDF sent to your email.");
    } catch {
      setStatus("error");
      setMessage("Unable to send the PDF right now.");
    }
  }

  function handleDownload() {
    if (!name.trim() || !email.trim() || !contact.trim() || !country.trim()) {
      setStatus("error");
      setMessage("Please fill in all fields before downloading.");
      return;
    }
    window.location.href = DOWNLOAD_HREF;
  }

  return (
    <main className="bg-[#F7F5EF] text-[#0C0C0C]">
      <div className="mx-auto max-w-[640px] px-5 py-12 sm:px-8 sm:py-16 lg:px-[42px]">
        <Link
          href={STUDY_PAGE_PATH}
          className="font-inter text-xs font-extrabold uppercase tracking-[0.1em] text-[#746F67] no-underline transition-opacity hover:opacity-70"
        >
          ← Back to study
        </Link>

        <header className="mt-8 border-b-4 border-[#0C0C0C] pb-6">
          <p className="mb-3 font-inter text-[10px] font-black uppercase tracking-[0.22em] text-[#746F67]">
            Full brief
          </p>
          <h1 className="font-eb-garamond text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-tight">
            Request the full study PDF
          </h1>
          <p className="mt-3 font-inter text-sm leading-relaxed text-[#45413C]">
            Enter your details below. You can download the PDF immediately or
            have it sent to your email.
          </p>
        </header>

        <form onSubmit={handleSendEmail} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="font-inter text-[10px] font-black uppercase tracking-[0.16em] text-[#746F67]">
              Name
            </span>
            <input
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                resetMessage();
              }}
              disabled={status === "loading"}
              className={inputClass}
              placeholder="Name"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-inter text-[10px] font-black uppercase tracking-[0.16em] text-[#746F67]">
              Email Address
            </span>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                resetMessage();
              }}
              disabled={status === "loading"}
              className={inputClass}
              placeholder="Email Address"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-inter text-[10px] font-black uppercase tracking-[0.16em] text-[#746F67]">
              Contact
            </span>
            <input
              name="contact"
              type="tel"
              required
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                resetMessage();
              }}
              disabled={status === "loading"}
              className={inputClass}
              placeholder="Contact"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-inter text-[10px] font-black uppercase tracking-[0.16em] text-[#746F67]">
              Country
            </span>
            <input
              name="country"
              type="text"
              required
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                resetMessage();
              }}
              disabled={status === "loading"}
              className={inputClass}
              placeholder="Country"
            />
          </label>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleDownload}
              disabled={status === "loading"}
              className="inline-flex items-center justify-center bg-[#0C0C0C] px-6 py-3.5 font-inter text-xs font-black uppercase tracking-[0.12em] text-white disabled:opacity-50"
            >
              Download PDF
            </button>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center border border-[#0C0C0C] bg-transparent px-6 py-3.5 font-inter text-xs font-black uppercase tracking-[0.12em] text-[#0C0C0C] disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : "Send PDF to email"}
            </button>
          </div>
        </form>

        {message ? (
          <p
            role="status"
            className={`mt-5 font-inter text-sm ${
              status === "error" ? "text-[#8B1E1E]" : "text-[#2F5D3A]"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </main>
  );
}
