import { NextResponse } from "next/server";
import { hasStudyAccess } from "@/lib/study-access";
import { fetchStudyPdfBuffer } from "@/lib/study-pdf";

export async function GET() {
  try {
    if (!(await hasStudyAccess())) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const pdf = await fetchStudyPdfBuffer();

    return new NextResponse(new Uint8Array(pdf.buffer), {
      status: 200,
      headers: {
        "Content-Type": pdf.contentType,
        "Content-Disposition": `attachment; filename="${pdf.filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to download the PDF." },
      { status: 500 },
    );
  }
}
