import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers-api";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email ?? "";

    const result = await addSubscriber(email);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (result.already) {
      return NextResponse.json({
        ok: true,
        already: true,
        message: "You are already subscribed.",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Subscribed successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to subscribe right now." },
      { status: 500 },
    );
  }
}
