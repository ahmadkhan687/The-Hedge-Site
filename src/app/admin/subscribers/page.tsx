import type { Metadata } from "next";
import AdminSubscribersList from "@/components/admin/AdminSubscribersList";
import { getAllSubscribers } from "@/lib/subscribers-api";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Subscribers | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSubscribersPage() {
  const configured = isSupabaseConfigured();
  const subscribers = configured ? await getAllSubscribers() : [];

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10">
      {!configured ? (
        <p className="font-inter text-sm text-[#6B665F]">
          Configure Supabase to manage subscribers.
        </p>
      ) : (
        <AdminSubscribersList subscribers={subscribers} />
      )}
    </div>
  );
}
