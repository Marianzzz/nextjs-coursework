import { db } from "@/db/db";
import { matches } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allMatches = await db.select().from(matches).orderBy(matches.date);
    return NextResponse.json(allMatches);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch matches." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      opponent,
      date,
      status, 
      result, 
      tournamentId,
      disciplineId,
    } = body;

    const created = await db
      .insert(matches)
      .values({
        opponent,
        date: new Date(date),
        status, 
        result, 
        tournamentId,
        disciplineId,
      })
      .returning();

    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create match." },
      { status: 500 }
    );
  }
}
