import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsubscribe | The Hedge Collective",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function UnsubscribePage({ searchParams }: PageProps) {
  const { status } = await searchParams;

  const title =
    status === "ok"
      ? "You are unsubscribed."
      : status === "invalid"
        ? "This unsubscribe link is invalid."
        : "We could not process your request.";

  const body =
    status === "ok"
      ? "You will no longer receive briefing emails from The Hedge Collective."
      : status === "invalid"
        ? "The link may be expired or incomplete. You can still request removal from the site admin."
        : "Please try again later, or contact us if this keeps happening.";

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-[#F4F0EA] px-5 py-16">
      <div className="flex w-full max-w-lg flex-col gap-6 text-center">
        <p className="font-inter text-xs font-extrabold uppercase tracking-[0.08em] text-[#111]">
          The Hedge Collective
        </p>
        <h1 className="font-eb-garamond text-[clamp(2rem,5vw,2.75rem)] font-medium text-[#111]">
          {title}
        </h1>
        <p className="font-inter text-base leading-[1.6] text-[#111]/75">
          {body}
        </p>
        <Link
          href="/perspectives"
          className="mx-auto inline-flex h-11 items-center justify-center bg-[#111] px-6 font-inter text-xs font-semibold uppercase tracking-[0.08em] text-white no-underline"
        >
          Back to Perspectives
        </Link>
      </div>
    </main>
  );
}
