"use server";
import { db } from "@/db/db";
import { matches } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { MatchSchema, MatchFormState } from "@/lib/definitions";

export async function getAllMatches() {
  try {
    const result = await db.select().from(matches).orderBy(asc(matches.date));
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
      .orderBy(asc(matches.date));
    return result;
  } catch (error) {
    console.error("Помилка при отриманні матчів турніру:", error);
    throw new Error("Не вдалося отримати матчі турніру.");
  }
}
export async function addMatch(formData: FormData): Promise<MatchFormState> {
  const raw = {
    opponent: formData.get("opponent"),
    date: formData.get("date"),
    status: formData.get("status"),
    result: formData.get("result"),
    tournamentId: formData.get("tournamentId")
      ? Number(formData.get("tournamentId"))
      : undefined,
    disciplineId: formData.get("disciplineId")
      ? Number(formData.get("disciplineId"))
      : undefined,
  };

  const result = MatchSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        opponent: errors.opponent,
        date: errors.date,
        status: errors.status,
        result: errors.result,
        tournamentId: errors.tournamentId,
        disciplineId: errors.disciplineId,
      },
    };
  }

  try {
    await db
      .insert(matches)
      .values({
        opponent: result.data.opponent,
        date: new Date(result.data.date),
        status: result.data.status,
        result: result.data.result ?? null,
        tournamentId: result.data.tournamentId ?? null,
        disciplineId: result.data.disciplineId ?? null,
      })
      .returning();

    revalidatePath("/matches");
    return {
      message: "Матч успішно додано.",
    };
  } catch (error) {
    console.error("Помилка при додаванні матчу:", error);
    return {
      message: "Не вдалося додати матч. Спробуйте пізніше.",
    };
  }
}
