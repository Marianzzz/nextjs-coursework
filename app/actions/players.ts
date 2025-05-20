"use server";

import { db } from "@/db/db";
import { players } from "@/db/schema";
import { PlayerSchema, PlayerFormState } from "@/lib/definitions";
import { revalidatePath } from "next/cache";

export async function addPlayer(formData: FormData): Promise<PlayerFormState> {
  const raw = {
    name: formData.get("name"),
    tag: formData.get("tag"),
    teamId: formData.get("teamId")
      ? Number(formData.get("teamId"))
      : undefined,
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
