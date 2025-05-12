import { db } from "@/db/db";
import { news } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allNews = await db.select().from(news).orderBy(news.publishedAt);
    return NextResponse.json(allNews);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch news." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, publishedAt, imageUrl, disciplineId } = body;

    const created = await db
      .insert(news)
      .values({
        title,
        content,
        publishedAt: new Date(publishedAt),
        imageUrl,
        disciplineId,
      })
      .returning();

    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create news." },
      { status: 500 },
    );
  }
}
