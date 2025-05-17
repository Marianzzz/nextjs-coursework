"use server";
import { db } from "@/db/db";
import { tournaments } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getAllTournaments() {
  try {
    const result = await db.select().from(tournaments).orderBy(desc(tournaments.startDate));
    return result;
  } catch (error) {
    console.error("Помилка при отриманні турнірів:", error);
    throw new Error("Не вдалося отримати турнірів.");
  }
}
