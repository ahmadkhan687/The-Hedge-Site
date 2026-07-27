import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | The Hedge Collective",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col gap-8 py-10">
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm font-extrabold uppercase tracking-[0.08em] text-[#C6A02C]">
          Admin
        </p>
        <h1 className="font-eb-garamond text-[clamp(2rem,4vw,40px)] font-medium text-[#111]">
          Sign in
        </h1>
        <p className="font-inter text-base leading-[1.6] text-[#6B665F]">
          Create and publish Perspectives articles. Use the user you created in
          Supabase Authentication.
        </p>
      </div>
      <AdminLoginForm />
    </div>
  );
}
