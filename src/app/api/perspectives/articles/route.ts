import { NextResponse } from "next/server";
import { getPublishedArticlesListing } from "@/lib/articles-api";

export const revalidate = 60;

export async function GET() {
  try {
    const articles = await getPublishedArticlesListing();
    return NextResponse.json(
      { articles },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    console.error("GET /api/perspectives/articles:", error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}
