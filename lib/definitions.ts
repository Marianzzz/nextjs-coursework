import { z } from "zod";

import { matchStatusEnum } from "@/db/schema";

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
  disciplineId: z.number({ required_error: "Дисципліна обов'язкова." }),
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

export type News = {
  id: number;
  title: string;
  content: string;
  publishedAt: Date;
  imageUrl: string | null;
  disciplineId: number | null;
};

export const NewsSchema = z.object({
  title: z.string().min(1, { message: "Заголовок обов’язковий" }).max(255),
  content: z.string().min(1, { message: "Вміст обов’язковий" }),
  disciplineId: z.number().int().positive().optional(),
  image: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "Дозволені лише JPEG, PNG або WebP" },
    )
    .refine((file) => file.size <= 4.5 * 1024 * 1024, {
      message: "Файл не може бути більшим за 4.5 МБ",
    })
    .optional(),
});

export type NewsFormState = {
  message?: string;
  errors?: {
    title?: string[];
    content?: string[];
    disciplineId?: string[];
    image?: string[];
  };
};
export type FormNews = {
  disciplines: Discipline[];
};
export type Tournament = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  prizePool: string | null;
};

export type Match = {
  id: number;
  opponent: string;
  date: Date;
  status: (typeof matchStatusEnum.enumValues)[number];
  result: string | null;
  tournamentId: number | null;
  disciplineId: number | null;
  discipline?: Discipline | null;
};
export const TournamentSchema = z.object({
  name: z
    .string()
    .min(1, "Назва турніру обов’язкова")
    .max(100, "Назва не може бути довшою за 100 символів"),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Вкажіть коректну дату початку (YYYY-MM-DD)")
    .refine(
      (date) => new Date(date).toString() !== "Invalid Date",
      "Некоректна дата початку",
    ),
  endDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Вкажіть коректну дату закінчення (YYYY-MM-DD)",
    )
    .refine(
      (date) => new Date(date).toString() !== "Invalid Date",
      "Некоректна дата закінчення",
    ),
  prizePool: z
    .string()
    .min(1, "Призовий фонд турніру обов’язкова")
    .max(50, "Призовий фонд не може бути довшим за 50 символів")
    .nullable(),
});

export type TournamentFormState = {
  errors?: {
    name?: string[];
    startDate?: string[];
    endDate?: string[];
    prizePool?: string[];
  };
  message?: string;
};
export const MatchSchema = z.object({
  opponent: z
    .string()
    .min(1, "Назва суперника обов’язкова")
    .max(100, "Назва суперника не може бути довшою за 100 символів"),
  date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
      "Вкажіть коректну дату і час (YYYY-MM-DDTHH:mm)",
    )
    .refine(
      (date) => new Date(date).toString() !== "Invalid Date",
      "Некоректна дата і час",
    ),
  status: z.enum(["live", "finished", "upcoming"], {
    errorMap: () => ({ message: "Виберіть коректний статус матчу" }),
  }),
  result: z
    .string()
    .max(50, "Результат не може бути довшим за 50 символів")
    .optional()
    .nullable(),
  tournamentId: z
    .number({ required_error: "Турнір суперника обов’язковий" })
    .int()
    .min(1, "Виберіть турнір зі списку"),

  disciplineId: z
    .number({ required_error: "Дисципліна обов'язкова" })
    .int()
    .min(1, "Виберіть дисципліну зі списку"),
});

export type MatchFormState = {
  errors?: {
    opponent?: string[];
    date?: string[];
    status?: string[];
    result?: string[];
    tournamentId?: string[];
    disciplineId?: string[];
  };
  message?: string;
};
export type FormMatch = {
  tournaments: { id: number; name: string }[];
  disciplines: { id: number; name: string }[];
};
export interface Player {
  id: number;
  name: string;
  tag: string;
}

export interface Team {
  id: number;
  name: string;
  tag: string;
  discipline?: Discipline | null;
  players?: Player[];
}

export interface TeamsProps {
  teams: Team[];
}
export interface PlayersCardProps {
  players: Player[];
}
export const TeamSchema = z.object({
  name: z.string().min(2, "Назва має містити щонайменше 2 символи"),
  tag: z.string().min(1, "Тег обовʼязковий"),
  disciplineId: z
    .number({ required_error: "Дисципліна обов'язкова" })
    .int()
    .min(1, "Виберіть дисципліну зі списку"),
});

export type TeamFormState = {
  errors?: {
    name?: string[];
    tag?: string[];
    disciplineId?: string[];
  };
  message?: string;
};
export type FormTeam = {
  disciplines: Discipline[];
};
export const PlayerSchema = z.object({
  name: z.string().min(2, "Ім’я надто коротке"),
  tag: z.string().min(2, "Тег надто короткий"),
  teamId: z.number({ required_error: "Команда обов'язкова" }).int().positive(),
  disciplineId: z
    .number({ required_error: "Дисципліна обов'язкова" })
    .int()
    .positive()
});

export type PlayerFormState = {
  errors?: {
    name?: string[];
    tag?: string[];
    teamId?: string[];
    disciplineId?: string[];
  };
  message?: string;
};
export type PlayersProps = {
  disciplines: { id: number; name: string }[];
  teams: {
    id: number;
    name: string;
    tag: string;
    discipline: { id: number; name: string } | null;
  }[];
};
