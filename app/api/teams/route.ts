import { db } from "@/db/db";
import { teams } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allTeams = await db
      .select()
      .from(teams)
      .orderBy(teams.name); 
    return NextResponse.json(allTeams);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch teams." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, tag, disciplineId } = body;

    const created = await db
      .insert(teams)
      .values({
        name,
        tag,
        disciplineId,
      })
      .returning();

    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create team." },
      { status: 500 }
    );
  }
}
