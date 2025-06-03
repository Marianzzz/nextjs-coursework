"use server";

import { getSession } from "@/lib/session";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ChangeEmailSchema } from "@/lib/definitions";
import { AccountState } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { ChangePasswordSchema } from "@/lib/definitions";

export async function changeEmail(formData: FormData): Promise<AccountState> {
  const session = await getSession();
  if (!session) redirect("/auth/signin");

  const raw = {
    email: formData.get("email"),
  };

  const result = ChangeEmailSchema.safeParse(raw);
  if (!result.success) {
    return {
      errors: {
        email: result.error.flatten().fieldErrors.email,
      },
    };
  }

  const newEmail = result.data.email;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, newEmail));

  if (existingUser.length > 0) {
    return {
      errors: {
        email: ["Ця електронна пошта вже використовується."],
      },
    };
  }

  await db
    .update(users)
    .set({ email: newEmail })
    .where(eq(users.id, session.userId));
  revalidatePath("/profile");
  return {
    message: "Електронну пошту оновлено успішно.",
  };
}

export async function changePassword(
  formData: FormData,
): Promise<AccountState> {
  const session = await getSession();
  if (!session) redirect("/auth/signin");

  const raw = {
    current: formData.get("current"),
    new: formData.get("new"),
  };

  const result = ChangePasswordSchema.safeParse(raw);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        current: errors.current,
        new: errors.new,
      },
    };
  }

  const { current, new: newPassword } = result.data;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .then((res) => res[0]);

  if (!user || !user.passwordHash) {
    return {
      errors: {
        current: [
          "Користувача не знайдено або він використовує GitHub авторизацію.",
        ],
      },
    };
  }

  const valid = await bcrypt.compare(current, user.passwordHash);
  if (!valid) {
    return {
      errors: {
        current: ["Невірний поточний пароль."],
      },
    };
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({ passwordHash: newHash })
    .where(eq(users.id, session.userId));

  return {
    message: "Пароль оновлено успішно.",
  };
}
