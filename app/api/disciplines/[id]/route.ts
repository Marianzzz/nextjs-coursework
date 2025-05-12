import { db } from "@/db/db";
import { disciplines } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const discipline = await db.query.disciplines.findFirst({
    where: (d, { eq }) => eq(d.id, Number(id)), 
  });
  if (!discipline) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(discipline);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;  
    const { name, imageUrl } = await req.json();
    const updated = await db
      .update(disciplines)
      .set({ name, imageUrl })
      .where(eq(disciplines.id, Number(id))) 
      .returning();
    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json({ error: "Failed to update discipline" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params; 
    await db.delete(disciplines).where(eq(disciplines.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete discipline" }, { status: 500 });
  }
}
