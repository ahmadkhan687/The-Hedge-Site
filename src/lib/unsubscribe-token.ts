import { createHmac, timingSafeEqual } from "crypto";
import { normalizeEmail } from "@/lib/subscribers";

function getSecret(): string {
  return (
    process.env.UNSUBSCRIBE_SECRET ||
    process.env.RESEND_API_KEY ||
    "hedge-unsubscribe-dev-secret"
  );
}

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, "base64").toString("utf8");
}

function sign(email: string): string {
  return createHmac("sha256", getSecret())
    .update(normalizeEmail(email))
    .digest("base64url");
}

/** Opaque token for unsubscribe links (email + HMAC). */
export function createUnsubscribeToken(email: string): string {
  const normalized = normalizeEmail(email);
  return `${toBase64Url(normalized)}.${sign(normalized)}`;
}

export function verifyUnsubscribeToken(token: string): string | null {
  const [encodedEmail, signature] = token.split(".");
  if (!encodedEmail || !signature) return null;

  try {
    const email = normalizeEmail(fromBase64Url(encodedEmail));
    const expected = sign(email);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return email;
  } catch {
    return null;
  }
}
