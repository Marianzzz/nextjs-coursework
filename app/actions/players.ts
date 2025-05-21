"use server";

import { db } from "@/db/db";
import { players, teams, disciplines } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PlayerSchema, PlayerFormState } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPlayerById(id: number) {
    try {
        const result = await db
            .select({
                id: players.id,
                name: players.name,
                tag: players.tag,
                team: {
                    id: teams.id,
                    name: teams.name,
                    tag: teams.tag,
                },
                discipline: {
                    id: disciplines.id,
                    name: disciplines.name,
                },
            })
            .from(players)
            .leftJoin(teams, eq(players.teamId, teams.id))
            .leftJoin(disciplines, eq(players.disciplineId, disciplines.id))
            .where(eq(players.id, id))
            .limit(1);
        return result[0];
    } catch (error) {
        console.error(`Помилка при отриманні гравця з ID ${id}:`, error);
        throw new Error("Не вдалося отримати гравця.");
    }
}
export async function addPlayer(formData: FormData): Promise<PlayerFormState> {
  const raw = {
    name: formData.get("name"),
    tag: formData.get("tag"),
    teamId: formData.get("teamId") ? Number(formData.get("teamId")) : undefined,
    disciplineId: formData.get("disciplineId")
      ? Number(formData.get("disciplineId"))
      : undefined,
  };

  const result = PlayerSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        name: errors.name,
        tag: errors.tag,
        teamId: errors.teamId,
        disciplineId: errors.disciplineId,
      },
    };
  }

  try {
    await db
      .insert(players)
      .values({
        name: result.data.name,
        tag: result.data.tag,
        teamId: result.data.teamId,
        disciplineId: result.data.disciplineId,
      })
      .returning();

    revalidatePath("/teams");
    return {
      message: "Гравця успішно додано.",
    };
  } catch (error) {
    console.error("Помилка при додаванні гравця:", error);
    return {
      message: "Не вдалося додати гравця. Спробуйте пізніше.",
    };
  }
}
export async function updatePlayer(
  id: number,
  formData: FormData,
): Promise<PlayerFormState> {
  const raw = {
  name: formData.get("name"),
  tag: formData.get("tag"),
  teamId: formData.get("teamId") ? Number(formData.get("teamId")) : undefined,
  disciplineId: formData.get("disciplineId") ? Number(formData.get("disciplineId")) : undefined,
};


  const result = PlayerSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        name: errors.name,
        tag: errors.tag,
        teamId: errors.teamId,
        disciplineId: errors.disciplineId,
      },
    };
  }

  try {
    await db
      .update(players)
      .set({
        name: result.data.name,
        tag: result.data.tag,
        teamId: result.data.teamId ?? null,
        disciplineId: result.data.disciplineId ?? null,
      })
      .where(eq(players.id, id));

    revalidatePath("/teams");

    return {
      message: "Гравця успішно оновлено.",
    };
  } catch (error) {
    console.error(`Помилка при оновленні гравця з ID ${id}:`, error);
    return {
      message: "Не вдалося оновити гравця. Спробуйте пізніше.",
    };
  }
}
export async function deletePlayer(id: number): Promise<void> {
  await db.delete(players).where(eq(players.id, id));
  revalidatePath("/teams");
  redirect("/teams");
}
