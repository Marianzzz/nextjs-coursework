import { db } from "@/db/db";
import { disciplines } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const discipline = await db.query.disciplines.findFirst({
    where: (d, { eq }) => eq(d.id, Number(id)),
  });

  if (!discipline) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(discipline);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { name, imageUrl } = await req.json();

    const updated = await db
      .update(disciplines)
      .set({ name, imageUrl })
      .where(eq(disciplines.id, Number(id)))
      .returning();

    return updated[0]
      ? NextResponse.json(updated[0])
      : NextResponse.json({ error: "Update failed" }, { status: 500 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update discipline" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await db.delete(disciplines).where(eq(disciplines.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete discipline" },
      { status: 500 }
    );
  }
}
