import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token";

function redirectToStatus(request: Request, status: "ok" | "error" | "invalid") {
  const url = new URL("/unsubscribe", request.url);
  url.searchParams.set("status", status);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") ?? "";

  const email = verifyUnsubscribeToken(token);
  if (!email) {
    return redirectToStatus(request, "invalid");
  }

  if (!isSupabaseConfigured()) {
    return redirectToStatus(request, "error");
  }

  const supabase = createPublicClient();
  const { error } = await supabase.rpc("unsubscribe_email", {
    p_email: email,
  });

  if (error) {
    console.error("unsubscribe_email:", error.message);
    return redirectToStatus(request, "error");
  }

  return redirectToStatus(request, "ok");
}
