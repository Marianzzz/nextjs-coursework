"use server";
import { db } from "@/db/db";
import { matches, disciplines, tournaments } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { MatchSchema, MatchFormState } from "@/lib/definitions";
import { redirect } from "next/navigation";

export async function getAllMatches() {
  try {
    const result = await db.select().from(matches).orderBy(asc(matches.date));
    return result;
  } catch (error) {
    console.error("Помилка при отриманні матчів:", error);
    throw new Error("Не вдалося отримати матчів.");
  }
}
export async function getLastFiveMatches() {
  try {
    const result = await db
      .select({
        id: matches.id,
        opponent: matches.opponent, 
        date: matches.date,
        status: matches.status,
        result: matches.result,
        tournamentId: matches.tournamentId,
        disciplineId: matches.disciplineId,
        discipline: disciplines,
        tournament: tournaments.name,
      })
      .from(matches)
      .leftJoin(disciplines, eq(matches.disciplineId, disciplines.id))
      .leftJoin(tournaments, eq(matches.tournamentId, tournaments.id))
      .orderBy(asc(matches.date)) 
      .limit(5); 

    return result.map((match) => ({
      ...match,
      discipline: match.discipline || null, 
      tournament: match.tournament || null,
    }));
  } catch (error) {
    console.error("Помилка при отриманні останніх матчів:", error);
    throw new Error("Не вдалося отримати останні матчі.");
  }
}

export async function getMatchById(id: number) {
  try {
    const result = await db
      .select()
      .from(matches)
      .where(eq(matches.id, id))
      .limit(1);
    return result[0];
  } catch (error) {
    console.error(`Помилка при отриманні матч з ID ${id}:`, error);
    throw new Error("Не вдалося отримати матч.");
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
export async function updateMatch(
  id: number,
  formData: FormData
): Promise<MatchFormState> {
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
    const updated = await db
      .update(matches)
      .set({
        opponent: result.data.opponent,
        date: new Date(result.data.date),
        status: result.data.status,
        result: result.data.result ?? null,
        tournamentId: result.data.tournamentId ?? null,
        disciplineId: result.data.disciplineId ?? null,
      })
      .where(eq(matches.id, id))
      .returning();

    if (updated.length === 0) {
      return {
        message: "Матч не знайдено.",
      };
    }

    revalidatePath("/matches");
    revalidatePath(`/matches/${id}`);

    return { message: "Матч успішно оновлено." };
  } catch (error) {
    console.error(`Помилка при оновленні матчу з ID ${id}:`, error);
    return { message: "Не вдалося оновити матч. Спробуйте пізніше." };
  }
}
export async function deleteMatch(id: number): Promise<void> {
  await db.delete(matches).where(eq(matches.id, id));
  revalidatePath("/matches");
  redirect("/matches");
}
