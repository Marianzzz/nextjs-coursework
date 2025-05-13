"use server";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { SignupFormSchema, FormState } from "@/lib/definitions";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { FormErrors } from "@/lib/definitions";
import { LoginFormSchema } from "@/lib/definitions";
import { deleteSession } from "@/lib/session";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as FormErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  if (existingUser.length > 0) {
    return {
      errors: {
        email: ["Цей email вже зареєстровано."],
      },
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    email,
    passwordHash,
  });

  const newUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();
    
  await createSession(newUser[0].id);

  redirect("/profile");
}
export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as FormErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  if (user.length === 0) {
    return {
      errors: {
        email: ["Невірний email або пароль."],
      },
    };
  }

  const foundUser = user[0];

  const isPasswordValid = await bcrypt.compare(password, foundUser.passwordHash);
  
  if (!isPasswordValid) {
    return {
      errors: {
        email: ["Невірний email або пароль."],
      },
    };
  }

  await createSession(foundUser.id);

  redirect("/profile");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}