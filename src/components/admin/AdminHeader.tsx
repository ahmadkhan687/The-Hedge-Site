"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  if (isLogin) {
    return (
      <header className="border-b border-[#111]/10 bg-[#F4F0EA]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-8">
          <p className="font-barlow-condensed text-base font-extrabold uppercase text-[#111]">
            Admin
          </p>
          <Link
            href="/"
            className="font-inter text-sm font-medium uppercase text-[#111]/70 no-underline transition-opacity hover:opacity-70"
          >
            Website
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-[#111]/10 bg-[#F4F0EA]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="font-barlow-condensed text-base font-extrabold uppercase text-[#111] no-underline"
          >
            Admin
          </Link>
          <Link
            href="/admin/articles/new"
            className="font-inter text-sm font-medium uppercase text-[#111]/70 no-underline transition-opacity hover:opacity-70"
          >
            New article
          </Link>
          <Link
            href="/perspectives"
            className="font-inter text-sm font-medium uppercase text-[#111]/70 no-underline transition-opacity hover:opacity-70"
          >
            View site
          </Link>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="font-inter text-sm font-medium uppercase text-[#111] transition-opacity hover:opacity-70"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
