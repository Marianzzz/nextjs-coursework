import { db } from "@/db/db";
import { disciplines } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allDisciplines = await db
      .select()
      .from(disciplines)
      .orderBy(disciplines.id);
    return NextResponse.json(allDisciplines);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch disciplines." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, imageUrl } = body;

    const created = await db
      .insert(disciplines)
      .values({
        name,
        imageUrl,
      })
      .returning();

    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create discipline." },
      { status: 500 },
    );
  }
}
