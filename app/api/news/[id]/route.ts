import { db } from "@/db/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const item = await db.query.news.findFirst({
    where: (n, { eq }) => eq(n.id, Number(id)),
  });

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { title, content, publishedAt, imageUrl, disciplineId } =
      await req.json();

    const updated = await db
      .update(news)
      .set({
        title,
        content,
        publishedAt: new Date(publishedAt),
        imageUrl,
        disciplineId,
      })
      .where(eq(news.id, Number(id)))
      .returning();

    return updated[0]
      ? NextResponse.json(updated[0])
      : NextResponse.json({ error: "Update failed" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await db.delete(news).where(eq(news.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }
}
