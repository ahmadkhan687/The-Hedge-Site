import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { getAllSubscribers } from "@/lib/subscribers-api";
import { createUnsubscribeToken } from "@/lib/unsubscribe-token";

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

function buildBriefingEmailHtml(options: {
  siteUrl: string;
  articleUrl: string;
  unsubscribeUrl: string;
  title: string;
  excerpt: string;
}): string {
  const { siteUrl, articleUrl, unsubscribeUrl, title, excerpt } = options;
  const logoUrl = `${siteUrl}/Home/logo.png`;
  const buttonStyle =
    "display:inline-block;background:#111111;color:#ffffff;text-decoration:none;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border:1px solid #111111;";

  return `
    <div style="margin:0;padding:0;background:#F4F0EA;">
      <div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#111111;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
          <tr>
            <td style="vertical-align:middle;padding-right:12px;">
              <img src="${logoUrl}" alt="The Hedge Collective" width="40" height="40" style="display:block;border:0;width:40px;height:40px;" />
            </td>
            <td style="vertical-align:middle;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#111111;">
                THE HEDGE COLLECTIVE
              </p>
            </td>
          </tr>
        </table>

        <h1 style="font-size:32px;font-weight:500;line-height:1.2;margin:0 0 16px;color:#111111;">
          ${escapeHtml(title)}
        </h1>

        <p style="font-size:16px;line-height:1.6;margin:0 0 28px;color:#111111;">
          ${escapeHtml(excerpt)}
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
          <tr>
            <td style="padding-right:10px;padding-bottom:10px;">
              <a href="${articleUrl}" style="${buttonStyle}">
                READ BRIEFING
              </a>
            </td>
            <td style="padding-bottom:10px;">
              <a href="${unsubscribeUrl}" style="${buttonStyle}">
                UNSUBSCRIBE
              </a>
            </td>
          </tr>
        </table>

        <p style="font-size:12px;line-height:1.5;margin:0;font-family:Arial,Helvetica,sans-serif;color:#111111;">
          You are receiving this because you subscribed to Hedge Collective briefings.
        </p>
      </div>
    </div>
  `;
}

export async function notifySubscribersOfArticle(
  article: NotifyArticlePayload,
): Promise<{
  sent: number;
  skipped: boolean;
  reason?:
    | "already_notified"
    | "not_published"
    | "not_configured"
    | "no_subscribers";
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

  for (const subscriber of subscribers) {
    try {
      const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${encodeURIComponent(
        createUnsubscribeToken(subscriber.email),
      )}`;

      const { error } = await resend.emails.send({
        from,
        to: subscriber.email,
        subject: `New briefing: ${article.title}`,
        html: buildBriefingEmailHtml({
          siteUrl,
          articleUrl,
          unsubscribeUrl,
          title: article.title,
          excerpt,
        }),
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
