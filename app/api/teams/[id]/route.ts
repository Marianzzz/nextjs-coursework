import { db } from "@/db/db";
import { teams } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const team = await db.query.teams.findFirst({
    where: (t, { eq }) => eq(t.id, Number(id)),
  });

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  return NextResponse.json(team);
}
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { name, tag, disciplineId } = await req.json();

    const updated = await db
      .update(teams)
      .set({
        name,
        tag,
        disciplineId,
      })
      .where(eq(teams.id, Number(id)))
      .returning();

    return updated[0]
      ? NextResponse.json(updated[0])
      : NextResponse.json({ error: "Update failed" }, { status: 500 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update team" },
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
    await db.delete(teams).where(eq(teams.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 500 }
    );
  }
}
