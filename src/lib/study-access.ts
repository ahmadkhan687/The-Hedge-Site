import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import {
  STUDY_ACCESS_COOKIE,
  STUDY_SLUG,
} from "@/lib/study-constants";

export {
  STUDY_SLUG,
  STUDY_ACCESS_COOKIE,
  STUDY_PAGE_PATH,
} from "@/lib/study-constants";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getAccessSecret(): string {
  return (
    process.env.STUDY_ACCESS_SECRET ||
    process.env.STUDY_PAGE_PASSWORD ||
    process.env.RESEND_API_KEY ||
    "hedge-study-dev-secret"
  );
}

function expectedToken(): string {
  return createHmac("sha256", getAccessSecret())
    .update(`study-access:${STUDY_SLUG}`)
    .digest("base64url");
}

export function isStudyPasswordConfigured(): boolean {
  return Boolean(process.env.STUDY_PAGE_PASSWORD?.trim());
}

export function verifyStudyPassword(password: string): boolean {
  const expected = process.env.STUDY_PAGE_PASSWORD ?? "";
  if (!expected) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createStudyAccessToken(): string {
  return expectedToken();
}

export function verifyStudyAccessToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expectedToken());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function studyAccessCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}

/** Server Components / Route Handlers: has this visitor unlocked the study? */
export async function hasStudyAccess(): Promise<boolean> {
  if (!isStudyPasswordConfigured()) return false;
  const jar = await cookies();
  return verifyStudyAccessToken(jar.get(STUDY_ACCESS_COOKIE)?.value);
}

export function getStudyPdfConfig(): {
  bucket: string;
  path: string;
  filename: string;
} | null {
  const bucket = process.env.STUDY_PDF_BUCKET?.trim();
  const path = process.env.STUDY_PDF_PATH?.trim();
  if (!bucket || !path) return null;

  const filename =
    process.env.STUDY_PDF_FILENAME?.trim() ||
    path.split("/").pop() ||
    `${STUDY_SLUG}.pdf`;

  return { bucket, path, filename };
}
