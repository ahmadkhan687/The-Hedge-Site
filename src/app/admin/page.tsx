import type { Metadata } from "next";
import AdminArticlesList from "@/components/admin/AdminArticlesList";
import { getAllAdminArticles } from "@/lib/articles-api";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const configured = isSupabaseConfigured();
  const articles = configured ? await getAllAdminArticles() : [];

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10">
      {!configured && <SetupGuide />}

      {configured && <AdminArticlesList articles={articles} />}
    </div>
  );
}

function SetupGuide() {
  return (
    <div className="flex flex-col gap-4 border border-[#111]/15 bg-white/50 p-6">
      <h2 className="font-eb-garamond text-2xl font-medium text-[#111]">
        Setup Supabase (once)
      </h2>
      <ol className="list-decimal space-y-3 pl-5 font-inter text-sm leading-[1.6] text-[#111]/80">
        <li>
          Create a project at{" "}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            supabase.com
          </a>
          .
        </li>
        <li>
          Copy Project URL and anon key into{" "}
          <code className="rounded bg-[#111]/5 px-1">.env.local</code> (see{" "}
          <code className="rounded bg-[#111]/5 px-1">.env.local.example</code>
          ).
        </li>
        <li>
          In Supabase → SQL Editor, run the full script in{" "}
          <code className="rounded bg-[#111]/5 px-1">supabase/schema.sql</code>
          .
        </li>
        <li>
          In Authentication → Users, create an admin user (email + password).
        </li>
        <li>
          Restart{" "}
          <code className="rounded bg-[#111]/5 px-1">npm run dev</code> and
          sign in here.
        </li>
      </ol>
    </div>
  );
}
