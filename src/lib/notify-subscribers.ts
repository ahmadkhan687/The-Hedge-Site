import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { getAllSubscribers } from "@/lib/subscribers-api";

export type NotifyArticlePayload = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
};

function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function notifySubscribersOfArticle(
  article: NotifyArticlePayload,
): Promise<{
  sent: number;
  skipped: boolean;
  reason?: "already_notified" | "not_published" | "not_configured" | "no_subscribers";
  error: string | null;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM || "The Hedge Collective <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      sent: 0,
      skipped: true,
      reason: "not_configured",
      error:
        "RESEND_API_KEY is not set. Add it to .env.local to enable email notifications.",
    };
  }

  const supabase = await createClient();

  // Skip if already notified
  const { data: existing } = await supabase
    .from("articles")
    .select("subscribers_notified_at, status")
    .eq("id", article.id)
    .maybeSingle();

  if (existing?.subscribers_notified_at) {
    return { sent: 0, skipped: true, reason: "already_notified", error: null };
  }

  if (existing && existing.status !== "published") {
    return {
      sent: 0,
      skipped: true,
      reason: "not_published",
      error: "Article is not published.",
    };
  }

  const subscribers = await getAllSubscribers();
  if (subscribers.length === 0) {
    await supabase
      .from("articles")
      .update({ subscribers_notified_at: new Date().toISOString() })
      .eq("id", article.id);
    return {
      sent: 0,
      skipped: false,
      reason: "no_subscribers",
      error: null,
    };
  }

  const resend = new Resend(apiKey);
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/perspectives/${article.slug}`;
  const excerpt = article.subtitle?.trim() || "A new briefing is available.";

  let sent = 0;
  const failures: string[] = [];

  // Send in small batches to respect free-tier daily limits
  for (const subscriber of subscribers) {
    try {
      const { error } = await resend.emails.send({
        from,
        to: subscriber.email,
        subject: `New briefing: ${article.title}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #111;">
            <p style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #C6A02C; font-family: sans-serif;">
              The Hedge Collective
            </p>
            <h1 style="font-size: 28px; font-weight: 500; line-height: 1.2; margin: 16px 0;">
              ${escapeHtml(article.title)}
            </h1>
            <p style="font-size: 16px; line-height: 1.6; color: #6B665F;">
              ${escapeHtml(excerpt)}
            </p>
            <p style="margin: 28px 0;">
              <a href="${articleUrl}" style="display:inline-block;background:#D7A92C;color:#111315;text-decoration:none;padding:12px 20px;font-family:sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">
                Read briefing
              </a>
            </p>
            <p style="font-size: 12px; color: #999; font-family: sans-serif;">
              You are receiving this because you subscribed to Hedge Collective briefings.
            </p>
          </div>
        `,
      });

      if (error) {
        failures.push(`${subscriber.email}: ${error.message}`);
      } else {
        sent += 1;
      }
    } catch (err) {
      failures.push(
        `${subscriber.email}: ${err instanceof Error ? err.message : "send failed"}`,
      );
    }
  }

  if (sent > 0 || failures.length === 0) {
    await supabase
      .from("articles")
      .update({ subscribers_notified_at: new Date().toISOString() })
      .eq("id", article.id);
  }

  if (failures.length > 0 && sent === 0) {
    return {
      sent: 0,
      skipped: false,
      error: failures.slice(0, 3).join("; "),
    };
  }

  return {
    sent,
    skipped: false,
    error:
      failures.length > 0
        ? `Sent ${sent}, but ${failures.length} failed.`
        : null,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
