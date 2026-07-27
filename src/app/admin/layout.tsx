import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#F4F0EA]">
      <AdminHeader />
      {!isSupabaseConfigured() && (
        <div className="border-b border-[#C6A02C]/40 bg-[#C6A02C]/10 px-5 py-3 text-center font-inter text-sm text-[#111] sm:px-8">
          Supabase is not configured yet. Add keys to{" "}
          <code className="font-semibold">.env.local</code> and run{" "}
          <code className="font-semibold">supabase/schema.sql</code>. See setup
          notes below on the dashboard.
        </div>
      )}
      <div className="flex-1 px-5 py-10 sm:px-8 lg:px-12">{children}</div>
      <div className="border-t border-[#111]/10 px-5 py-4 text-center sm:px-8">
        <Link
          href="/"
          className="font-inter text-xs font-medium uppercase tracking-[0.08em] text-[#6B665F] no-underline hover:opacity-70"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
