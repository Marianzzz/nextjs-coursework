"use server";
import { db } from "@/db/db";
import { media, disciplines } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { MediaSchema } from "@/lib/definitions";
import { MediaFormState } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
export async function getLastTwoMedia() {
  try {
    const result = await db
      .select({
        id: media.id,
        title: media.title,
        videoUrl: media.videoUrl,
        uploadedAt: media.uploadedAt,
        disciplineId: media.disciplineId,
        discipline: disciplines,
      })
      .from(media)
      .leftJoin(disciplines, eq(media.disciplineId, disciplines.id))
      .orderBy(desc(media.uploadedAt))
      .limit(2);

    return result.map((mediaItem) => ({
      ...mediaItem,
      discipline: mediaItem.discipline || null,
    }));
  } catch (error) {
    console.error("Помилка при отриманні останніх 6 медіа:", error);
    throw new Error("Не вдалося отримати останні 6 медіа.");
  }
}
export async function getMediaById(id: number) {
  try {
    const result = await db
      .select()
      .from(media)
      .where(eq(media.id, id))
      .limit(1);
    return result[0];
  } catch (error) {
    console.error(`Помилка при отриманні медіа з ID ${id}:`, error);
    throw new Error("Не вдалося отримати медіа.");
  }
}
export async function addMedia(formData: FormData): Promise<MediaFormState> {
  const raw = {
    title: formData.get("title"),
    videoUrl: formData.get("videoUrl"),
    disciplineId: formData.get("disciplineId")
      ? Number(formData.get("disciplineId"))
      : undefined,
  };

  const result = MediaSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        title: errors.title,
        videoUrl: errors.videoUrl,
        disciplineId: errors.disciplineId,
      },
    };
  }

  try {
    await db
      .insert(media)
      .values({
        title: result.data.title,
        videoUrl: result.data.videoUrl,
        disciplineId: result.data.disciplineId ?? null,
        uploadedAt: new Date(),
      })
      .returning();
    revalidatePath("/media");
    return {
      message: "Медіа успішно додано.",
    };
  } catch (error) {
    console.error("Помилка при додаванні медіа:", error);
    return {
      message: "Не вдалося додати медіа. Спробуйте пізніше.",
    };
  }
}

export async function updateMedia(
  id: number,
  formData: FormData,
): Promise<MediaFormState> {
  const raw = {
    title: formData.get("title"),
    videoUrl: formData.get("videoUrl"),
    disciplineId: formData.get("disciplineId")
      ? Number(formData.get("disciplineId"))
      : undefined,
  };

  const result = MediaSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        title: errors.title,
        videoUrl: errors.videoUrl,
        disciplineId: errors.disciplineId,
      },
    };
  }

  try {
    await db
      .update(media)
      .set({
        title: result.data.title,
        videoUrl: result.data.videoUrl,
        disciplineId: result.data.disciplineId ?? null,
      })
      .where(eq(media.id, id));
    revalidatePath("/media");

    return {
      message: "Медіа успішно оновлено.",
    };
  } catch (error) {
    console.error(`Помилка при оновленні медіа з ID ${id}:`, error);
    return {
      message: "Не вдалося оновити медіа. Спробуйте пізніше.",
    };
  }
}
export async function deleteMedia(id: number): Promise<void> {
  await db.delete(media).where(eq(media.id, id));
  revalidatePath("/media");
  redirect("/media");
}
