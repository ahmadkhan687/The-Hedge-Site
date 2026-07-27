import { NextResponse } from "next/server";
import { notifySubscribersOfArticle } from "@/lib/notify-subscribers";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      id?: string;
      slug?: string;
      title?: string;
      subtitle?: string;
    };

    if (!body.id || !body.slug || !body.title) {
      return NextResponse.json(
        { error: "id, slug, and title are required." },
        { status: 400 },
      );
    }

    const result = await notifySubscribersOfArticle({
      id: body.id,
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle,
    });

    if (result.error && result.sent === 0 && !result.skipped) {
      return NextResponse.json(
        { error: result.error, sent: result.sent, skipped: result.skipped },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      sent: result.sent,
      skipped: result.skipped,
      reason: result.reason,
      warning: result.error,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to notify subscribers.",
      },
      { status: 500 },
    );
  }
}
