import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  if (existing.length > 0) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const inserted = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      role: "user",
    })
    .returning();

  const newUser = inserted[0];

  await createSession(newUser.id);

  return NextResponse.json(
    { message: "Signup successful", userId: newUser.id },
    { status: 201 },
  );
}
