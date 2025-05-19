"use server";
import { db } from "@/db/db";
import { tournaments, matches } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { TournamentFormState, TournamentSchema } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function addTournament(
  formData: FormData,
): Promise<TournamentFormState> {
  const raw = {
    name: formData.get("name"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    prizePool: formData.get("prizePool"),
    disciplineId: formData.get("disciplineId")
      ? Number(formData.get("disciplineId"))
      : undefined,
  };

  const result = TournamentSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        name: errors.name,
        startDate: errors.startDate,
        endDate: errors.endDate,
        prizePool: errors.prizePool,
      },
    };
  }

  try {
    await db
      .insert(tournaments)
      .values({
        name: result.data.name,
        startDate: result.data.startDate,
        endDate: result.data.endDate,
        prizePool: result.data.prizePool,
      })
      .returning();

    revalidatePath("/tournaments");
    return {
      message: "Турнір успішно додано.",
    };
  } catch (error) {
    console.error("Помилка при додаванні турніру:", error);
    return {
      message: "Не вдалося додати турнір. Спробуйте пізніше.",
    };
  }
}
export async function updateTournament(
  id: number,
  formData: FormData,
): Promise<TournamentFormState> {
  const raw = {
    name: formData.get("name"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    prizePool: formData.get("prizePool"),
  };

  const result = TournamentSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        name: errors.name,
        startDate: errors.startDate,
        endDate: errors.endDate,
        prizePool: errors.prizePool,
      },
    };
  }

  try {
    await db
      .update(tournaments)
      .set({
        name: result.data.name,
        startDate: result.data.startDate,
        endDate: result.data.endDate,
        prizePool: result.data.prizePool ?? null,
      })
      .where(eq(tournaments.id, id));

    revalidatePath("/tournaments");
    revalidatePath(`/tournaments/${id}`);

    return { message: "Турнір успішно оновлено." };
  } catch (error) {
    console.error(`Помилка при оновленні турніру з ID ${id}:`, error);
    return { message: "Не вдалося оновити турнір. Спробуйте пізніше." };
  }
}

export async function deleteTournament(id: number): Promise<void> {
  await db.delete(matches).where(eq(matches.tournamentId, id));

  await db.delete(tournaments).where(eq(tournaments.id, id));

  revalidatePath("/tournaments");
  redirect("/tournaments");
}
