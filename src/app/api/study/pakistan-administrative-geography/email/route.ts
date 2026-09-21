import { NextResponse } from "next/server";
import { hasStudyAccess } from "@/lib/study-access";
import { sendStudyPdfEmail } from "@/lib/send-study-pdf-email";

export async function POST(request: Request) {
  try {
    if (!(await hasStudyAccess())) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as {
      email?: string;
      name?: string;
      contact?: string;
      country?: string;
    };

    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (!body.contact?.trim()) {
      return NextResponse.json(
        { error: "Please enter your contact." },
        { status: 400 },
      );
    }

    if (!body.country?.trim()) {
      return NextResponse.json(
        { error: "Please enter your country." },
        { status: 400 },
      );
    }

    const result = await sendStudyPdfEmail(body.email ?? "", {
      name: body.name.trim(),
      contact: body.contact.trim(),
      country: body.country.trim(),
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      message: "PDF sent to your email.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to send the PDF right now." },
      { status: 500 },
    );
  }
}
