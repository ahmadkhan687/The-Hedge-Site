import { NextResponse } from "next/server";
import {
  createStudyAccessToken,
  isStudyPasswordConfigured,
  studyAccessCookieOptions,
  STUDY_ACCESS_COOKIE,
  verifyStudyPassword,
} from "@/lib/study-access";

export async function POST(request: Request) {
  try {
    if (!isStudyPasswordConfigured()) {
      return NextResponse.json(
        { error: "Access is not configured." },
        { status: 503 },
      );
    }

    const body = (await request.json()) as { password?: string };
    const password = body.password ?? "";

    if (!verifyStudyPassword(password)) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(
      STUDY_ACCESS_COOKIE,
      createStudyAccessToken(),
      studyAccessCookieOptions(),
    );
    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to unlock right now." },
      { status: 500 },
    );
  }
}
