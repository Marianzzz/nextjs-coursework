"use server";
import { put } from "@vercel/blob";
import { db } from "@/db/db";
import { news } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NewsSchema, NewsFormState } from "@/lib/definitions";

export async function getAllNews() {
  try {
    const result = await db.select().from(news).orderBy(desc(news.publishedAt));
    return result;
  } catch (error) {
    console.error("Помилка при отриманні новини:", error);
    throw new Error("Не вдалося отримати новину.");
  }
}
export async function getNewsById(id: number) {
  try {
    const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
    return result[0];
  } catch (error) {
    console.error(`Помилка при отриманні новини з ID ${id}:`, error);
    throw new Error("Не вдалося отримати новину.");
  }
}

export async function addNews(formData: FormData): Promise<NewsFormState> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN не налаштовано");
    return { message: "Налаштування Vercel Blob відсутні" };
  }

  const raw = {
    title: formData.get("title"),
    content: formData.get("content"),
    disciplineId: formData.get("disciplineId")
      ? Number(formData.get("disciplineId"))
      : undefined,
    image: formData.get("image") as File | null,
  };

  const result = NewsSchema.safeParse(raw);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        title: errors.title,
        content: errors.content,
        disciplineId: errors.disciplineId,
        image: errors.image,
      },
    };
  }

  try {
    let imageUrl: string | null = null;

    if (result.data.image && result.data.image.size > 0) {
      const blob = await put(
        `news/${Date.now()}/${result.data.image.name}`,
        result.data.image,
        {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN,
          contentType: result.data.image.type,
        },
      );
      imageUrl = blob.url;
    }

    const [newNews] = await db
      .insert(news)
      .values({
        title: result.data.title,
        content: result.data.content,
        publishedAt: new Date(),
        disciplineId: result.data.disciplineId ?? null,
        imageUrl,
      })
      .returning();
    revalidatePath("/news");
    revalidatePath(`/news/${newNews.id}`);

    return { message: "Новину успішно додано." };
  } catch (error) {
    console.error("Помилка при додаванні новини:", error);
    return { message: "Не вдалося додати новину. Спробуйте пізніше." };
  }
}
