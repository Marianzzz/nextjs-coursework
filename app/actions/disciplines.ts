"use server";
import { db } from "@/db/db";
import { disciplines } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllDisciplines() {
  try {
    const result = await db.select().from(disciplines);
    return result;
  } catch (error) {
    console.error("Помилка при отриманні дисципліни:", error);
    throw new Error("Не вдалося отримати дисципліни.");
  }
}
export async function getDisciplineById(id: number) {
  try {
    const result = await db
      .select()
      .from(disciplines)
      .where(eq(disciplines.id, id))
      .limit(1);
    return result[0];
  } catch (error) {
    console.error(`Помилка при отриманні медіа з ID ${id}:`, error);
    throw new Error("Не вдалося отримати медіа.");
  }
}
