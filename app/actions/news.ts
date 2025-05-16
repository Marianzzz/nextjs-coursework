"use server";
import { db } from "@/db/db";
import { news } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getAllNews() {
  try {
    const result = await db.select().from(news).orderBy(desc(news.publishedAt));
    return result;
  } catch (error) {
    console.error("Помилка при отриманні новини:", error);
    throw new Error("Не вдалося отримати новину.");
  }
}
