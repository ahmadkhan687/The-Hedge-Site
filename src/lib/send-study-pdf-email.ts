import { Resend } from "resend";
import { isValidEmail, normalizeEmail } from "@/lib/subscribers";
import { fetchStudyPdfBuffer } from "@/lib/study-pdf";

type StudyRequester = {
  name?: string;
  contact?: string;
  country?: string;
};

/**
 * Isolated Resend send for the Pakistan study PDF.
 * Does not touch subscriber notifications.
 */
export async function sendStudyPdfEmail(
  to: string,
  requester?: StudyRequester,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM || "The Hedge Collective <onboarding@resend.dev>";

  if (!apiKey) {
    return { ok: false, error: "Email is not configured." };
  }

  const email = normalizeEmail(to);
  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  let pdf: Awaited<ReturnType<typeof fetchStudyPdfBuffer>>;
  try {
    pdf = await fetchStudyPdfBuffer();
  } catch {
    return { ok: false, error: "Unable to load the study PDF." };
  }

  const greeting = requester?.name?.trim()
    ? `Hi ${escapeHtml(requester.name.trim())},`
    : "Hello,";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Your briefing: Pakistan’s Administrative Geography",
    html: `
      <div style="margin:0;padding:0;background:#F7F5EF;">
        <div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#0C0C0C;">
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;">
            THE HEDGE COLLECTIVE
          </p>
          <h1 style="font-size:28px;font-weight:500;line-height:1.25;margin:0 0 16px;">
            Pakistan’s Administrative Geography
          </h1>
          <p style="font-size:16px;line-height:1.6;margin:0 0 12px;">
            ${greeting}
          </p>
          <p style="font-size:16px;line-height:1.6;margin:0;">
            Your requested PDF briefing is attached to this email.
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: pdf.filename,
        content: pdf.buffer,
      },
    ],
  });

  if (error) {
    return { ok: false, error: "Unable to send the PDF right now." };
  }

  return { ok: true };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
