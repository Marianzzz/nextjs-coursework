import { db } from "@/db/db";
import { tournaments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const tournament = await db.query.tournaments.findFirst({
    where: (t, { eq }) => eq(t.id, Number(id)),
  });

  if (!tournament) {
    return NextResponse.json(
      { error: "Tournament not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(tournament);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { name, startDate, endDate, prizePool } = await req.json();

    const updated = await db
      .update(tournaments)
      .set({
        name,
        startDate: new Date(startDate).toISOString().split("T")[0],
        endDate: new Date(endDate).toISOString().split("T")[0],
        prizePool,
      })
      .where(eq(tournaments.id, Number(id)))
      .returning();

    return updated[0]
      ? NextResponse.json(updated[0])
      : NextResponse.json({ error: "Update failed" }, { status: 500 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update tournament" },
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
    await db.delete(tournaments).where(eq(tournaments.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete tournament" },
      { status: 500 },
    );
  }
}
