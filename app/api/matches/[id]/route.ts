import { db } from "@/db/db";
import { matches } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const match = await db.query.matches.findFirst({
    where: (m, { eq }) => eq(m.id, Number(id)),
  });

  if (!match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }

  return NextResponse.json(match);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { opponent, date, status, result, tournamentId, disciplineId } =
      await req.json();

    const updated = await db
      .update(matches)
      .set({
        opponent,
        date: new Date(date),
        status,
        result,
        tournamentId,
        disciplineId,
      })
      .where(eq(matches.id, Number(id)))
      .returning();

    return updated[0]
      ? NextResponse.json(updated[0])
      : NextResponse.json({ error: "Update failed" }, { status: 500 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update match" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await db.delete(matches).where(eq(matches.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete match" },
      { status: 500 },
    );
  }
}
