import { db } from "@/db/db"; 
import { media } from "@/db/schema"; 
import { desc } from "drizzle-orm";

export async function getAllMedia() {
  try {
    const result = await db
      .select()
      .from(media)
      .orderBy(desc(media.uploadedAt)); 
    return result;
  } catch (error) {
    console.error("Помилка при отриманні медіа:", error);
    throw new Error("Не вдалося отримати медіа.");
  }
}