import { db } from "@/db/db";
import { players } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const player = await db.query.players.findFirst({
    where: (p, { eq }) => eq(p.id, Number(id)),
  });

  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  return NextResponse.json(player);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { name, tag, teamId, disciplineId } = await req.json();

    const updated = await db
      .update(players)
      .set({
        name,
        tag,
        teamId,
        disciplineId,
      })
      .where(eq(players.id, Number(id)))
      .returning();

    return updated[0]
      ? NextResponse.json(updated[0])
      : NextResponse.json({ error: "Update failed" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Failed to update player" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await db.delete(players).where(eq(players.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete player" }, { status: 500 });
  }
}
