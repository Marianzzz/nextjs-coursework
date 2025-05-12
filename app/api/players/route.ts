import { db } from "@/db/db";
import { players } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allPlayers = await db.select().from(players).orderBy(players.name);
    return NextResponse.json(allPlayers);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch players." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, tag, teamId, disciplineId } = await req.json();

    const createdPlayer = await db
      .insert(players)
      .values({
        name,
        tag,
        teamId,
        disciplineId,
      })
      .returning(); 

    return NextResponse.json(createdPlayer[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create player." },
      { status: 500 }
    );
  }
}
