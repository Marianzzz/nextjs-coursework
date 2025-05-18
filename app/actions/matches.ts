"use server";
import { db } from "@/db/db";
import { matches } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getAllMatches() {
  try {
    const result = await db.select().from(matches).orderBy(desc(matches.date));
    return result;
  } catch (error) {
    console.error("Помилка при отриманні матчів:", error);
    throw new Error("Не вдалося отримати матчів.");
  }
}

export async function getMatchesByTournamentId(tournamentId: number) {
  try {
    const result = await db
      .select()
      .from(matches)
      .where(eq(matches.tournamentId, tournamentId))
      .orderBy(desc(matches.date));
    return result;
  } catch (error) {
    console.error("Помилка при отриманні матчів турніру:", error);
    throw new Error("Не вдалося отримати матчі турніру.");
  }
}
