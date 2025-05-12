import { db } from "@/db/db";
import { tournaments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allTournaments = await db
      .select()
      .from(tournaments)
      .orderBy(tournaments.startDate);
    return NextResponse.json(allTournaments);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tournaments." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, startDate, endDate, prizePool } = body;

    const created = await db
      .insert(tournaments)
      .values({
        name,
        startDate: new Date(startDate).toISOString().split('T')[0],  
        endDate: new Date(endDate).toISOString().split('T')[0],      
        prizePool,
      })
      .returning();

    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create tournament." },
      { status: 500 }
    );
  }
}
