"use server";
import { db } from "@/db/db";
import { tournaments } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { TournamentFormState, TournamentSchema } from '@/lib/definitions';
import { revalidatePath } from "next/cache";

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

export async function addTournament(formData: FormData): Promise<TournamentFormState> {
  const raw = {
    name: formData.get('name'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    prizePool: formData.get('prizePool'),
    disciplineId: formData.get('disciplineId')
      ? Number(formData.get('disciplineId'))
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

    revalidatePath('/tournaments');
    return {
      message: 'Турнір успішно додано.',
    };
  } catch (error) {
    console.error('Помилка при додаванні турніру:', error);
    return {
      message: 'Не вдалося додати турнір. Спробуйте пізніше.',
    };
  }
}