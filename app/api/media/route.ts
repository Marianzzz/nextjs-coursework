import { db } from "@/db/db";
import { media } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allMedia = await db.select().from(media).orderBy(media.uploadedAt);
    return NextResponse.json(allMedia);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch media." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      videoUrl,
      uploadedAt,
      disciplineId, 
    } = body;

    const created = await db
      .insert(media)
      .values({
        title,
        videoUrl,
        uploadedAt: new Date(uploadedAt),
        disciplineId,
      })
      .returning();

    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create media." },
      { status: 500 }
    );
  }
}
