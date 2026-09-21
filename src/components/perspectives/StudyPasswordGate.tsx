"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudyPasswordGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/study/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Incorrect password.");
        return;
      }

      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Unable to unlock right now.");
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F5EF] px-5 py-16 text-[#0C0C0C]">
      <div className="w-full max-w-md border-t-4 border-[#0C0C0C] pt-8">
        <p className="mb-3 font-inter text-[10px] font-black uppercase tracking-[0.22em] text-[#746F67]">
          Restricted briefing
        </p>
        <h1 className="mb-3 font-eb-garamond text-[clamp(1.75rem,4vw,2.25rem)] font-medium">
          Pakistan’s Administrative Geography
        </h1>
        <p className="mb-8 font-inter text-sm leading-relaxed text-[#45413C]">
          Enter the access password to view this study.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-inter text-[10px] font-black uppercase tracking-[0.16em] text-[#746F67]">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              disabled={status === "loading"}
              className="w-full border border-[#0C0C0C]/25 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-[#0C0C0C]"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-fit items-center bg-[#0C0C0C] px-6 py-3 font-inter text-xs font-black uppercase tracking-[0.12em] text-white disabled:opacity-50"
          >
            {status === "loading" ? "Checking…" : "Unlock"}
          </button>
        </form>

        {message ? (
          <p role="status" className="mt-4 font-inter text-sm text-[#8B1E1E]">
            {message}
          </p>
        ) : null}
      </div>
    </main>
  );
}
