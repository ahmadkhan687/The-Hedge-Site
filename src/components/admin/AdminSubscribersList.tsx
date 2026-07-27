"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Subscriber } from "@/lib/subscribers";
import { createClient } from "@/lib/supabase/client";

type AdminSubscribersListProps = {
  subscribers: Subscriber[];
};

export default function AdminSubscribersList({
  subscribers,
}: AdminSubscribersListProps) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subscribers;
    return subscribers.filter((s) => s.email.toLowerCase().includes(q));
  }, [subscribers, query]);

  async function handleDelete(id: string, email: string) {
    if (!window.confirm(`Remove “${email}” from the briefing list?`)) return;

    setBusyId(id);
    setError("");
    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("subscribers")
      .delete()
      .eq("id", id);
    setBusyId(null);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-inter text-sm font-extrabold uppercase tracking-[0.08em] text-[#C6A02C]">
            Briefings
          </p>
          <h1 className="font-eb-garamond text-[clamp(2rem,4vw,40px)] font-medium text-[#111]">
            Subscribers
          </h1>
          <p className="font-inter text-sm text-[#6B665F]">
            {subscribers.length}{" "}
            {subscribers.length === 1 ? "person" : "people"} on the list.
            They get an email when you publish a new article.
          </p>
        </div>

        <label className="w-full sm:w-auto sm:min-w-[240px]">
          <span className="sr-only">Search subscribers</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search emails…"
            className="h-11 w-full border-0 border-b border-[#111]/20 bg-transparent font-inter text-base text-[#111] outline-none placeholder:text-[#111]/35 focus:border-[#111]/50"
          />
        </label>
      </div>

      {error ? (
        <p role="alert" className="font-inter text-sm text-[#B3261E]">
          {error}
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <p className="font-inter text-base text-[#6B665F]">
          {query.trim()
            ? "No subscribers match your search."
            : "No subscribers yet. People who use Subscribe to Briefings on Perspectives will appear here."}
        </p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((subscriber, index) => (
            <div key={subscriber.id}>
              <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-[1fr_160px_auto] sm:items-center sm:gap-6">
                <p className="font-inter text-base text-[#111]">
                  {subscriber.email}
                </p>
                <p className="font-inter text-sm text-[#6B665F]">
                  {new Date(subscriber.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <button
                  type="button"
                  disabled={busyId === subscriber.id}
                  onClick={() => handleDelete(subscriber.id, subscriber.email)}
                  className="justify-self-start font-inter text-xs font-semibold uppercase tracking-[0.06em] text-[#B3261E] transition-opacity hover:opacity-70 disabled:opacity-40 sm:justify-self-end"
                >
                  {busyId === subscriber.id ? "Removing…" : "Remove"}
                </button>
              </div>
              {index < filtered.length - 1 ? (
                <div className="h-px w-full bg-[#111]/[0.08]" />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
