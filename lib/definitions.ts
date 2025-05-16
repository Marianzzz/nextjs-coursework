import { z } from "zod";

export type SessionPayload = {
  userId: string;
  role: "user" | "admin";
  expiresAt: Date;
};

export interface FormErrors {
  email?: string[];
  password?: string[];
}

export const SignupFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Введіть дійсну адресу електронної пошти." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Має принаймні 8 символів" })
    .regex(/[a-zA-Z]/, { message: "Містить хоча б одну букву." })
    .regex(/[0-9]/, { message: "Містить хоча б одне число." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Містить принаймні один спеціальний символ.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email("Невірний формат email"),
  password: z.string().min(6, "Пароль має бути не менше 6 символів"),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
export const ChangeEmailSchema = z.object({
  email: z.string().email("Некоректна електронна пошта.").trim(),
});

export const ChangePasswordSchema = z.object({
  current: z.string().min(1, "Введіть поточний пароль."),
  new: z
    .string()
    .min(8, { message: "Має принаймні 8 символів" })
    .regex(/[a-zA-Z]/, { message: "Містить хоча б одну букву." })
    .regex(/[0-9]/, { message: "Містить хоча б одне число." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Містить принаймні один спеціальний символ.",
    }),
});

export type AccountState = {
  errors?: {
    email?: string[];
    current?: string[];
    new?: string[];
  };
  message?: string;
};
export type Video = {
  id: number;
  title: string;
  videoUrl: string;
  uploadedAt: Date;
};

export const MediaSchema = z.object({
  title: z.string().min(1, "Назва обов'язкова.").trim(),
  videoUrl: z.string().url("Введіть дійсний URL відео.").trim(),
  disciplineId: z
    .number({ invalid_type_error: "Дисципліна обов'язкова." })
});

export type MediaFormState =
  | {
      errors?: {
        title?: string[];
        videoUrl?: string[];
        disciplineId?: string[];
      };
      message?: string;
    }
  | undefined;

export type Discipline = {
  id: number;
  name: string;
};

export type FormMedia = {
  disciplines: Discipline[];
};

export interface MediaEditProps {
  media: {
    id: number;
    title: string;
    videoUrl: string;
    disciplineId?: number | null;
  };
  disciplines: { id: number; name: string }[];
  onDelete: (formData: FormData) => void;
}

export interface PageProps {
  params: Promise<{ id: string }>;
}
export interface News {
  id: number;
  title: string;
  content: string;
  publishedAt: Date;
  imageUrl?: string | null;
  disciplineId?: number | null;
}