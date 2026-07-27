import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import {
  isValidEmail,
  normalizeEmail,
  type Subscriber,
} from "@/lib/subscribers";

function mapRow(row: Record<string, unknown>): Subscriber {
  return {
    id: String(row.id),
    email: String(row.email),
    created_at: String(row.created_at),
  };
}

export async function addSubscriber(
  rawEmail: string,
): Promise<{ subscriber: Subscriber | null; error: string | null; already?: boolean }> {
  if (!isSupabaseConfigured()) {
    return { subscriber: null, error: "Supabase is not configured." };
  }

  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) {
    return { subscriber: null, error: "Enter a valid email address." };
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("subscribers").insert({ email });

  if (error) {
    // Unique violation — already subscribed
    if (error.code === "23505") {
      return { subscriber: null, error: null, already: true };
    }
    return { subscriber: null, error: error.message };
  }

  return { subscriber: null, error: null };
}

export async function getAllSubscribers(): Promise<Subscriber[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("getAllSubscribers:", error?.message);
    return [];
  }

  return data.map((row) => mapRow(row as Record<string, unknown>));
}

export async function deleteSubscriber(
  id: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("subscribers").delete().eq("id", id);
  return { error: error?.message ?? null };
}

export async function getSubscriberCount(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("subscribers")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("getSubscriberCount:", error.message);
    return 0;
  }

  return count ?? 0;
}
