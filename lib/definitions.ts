import { z } from "zod";
export type SessionPayload = {
  userId: string;
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
