"use server";
import { db } from "@/db/db";
import { tournaments } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getAllTournaments() {
  try {
    const result = await db
      .select()
      .from(tournaments)
      .orderBy(desc(tournaments.startDate));
    return result;
  } catch (error) {
    console.error("Помилка при отриманні турнірів:", error);
    throw new Error("Не вдалося отримати турнірів.");
  }
}
export async function getTournamentById(id: number) {
  try {
    const result = await db
      .select()
      .from(tournaments)
      .where(eq(tournaments.id, id))
      .limit(1);
    return result[0];
  } catch (error) {
    console.error(`Помилка при отриманні турніру з ID ${id}:`, error);
    throw new Error("Не вдалося отримати турнір.");
  }
}
