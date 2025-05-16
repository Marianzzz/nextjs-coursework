"use server";
import { db } from "@/db/db";
import { disciplines } from "@/db/schema";

export async function getAllDisciplines() {
  try {
    const result = await db.select().from(disciplines);
    return result;
  } catch (error) {
    console.error("Помилка при отриманні дисципліни:", error);
    throw new Error("Не вдалося отримати дисципліни.");
  }
}
