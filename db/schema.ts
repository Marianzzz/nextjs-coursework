import { pgTable, serial, text, timestamp, date, varchar, pgEnum, integer } from "drizzle-orm/pg-core";

export const matchStatusEnum = pgEnum("match_status", ["live", "finished", "upcoming"]);
export const userRoleEnum = pgEnum("role", ["user", "admin"]);

export const disciplines = pgTable("disciplines", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  imageUrl: text("image_url"),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  imageUrl: text("image_url"),
  disciplineId: integer("discipline_id").references(() => disciplines.id, {
    onDelete: "set null",
  }),
});

export const tournaments = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  prizePool: text("prize_pool"),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  opponent: text("opponent").notNull(),
  date: timestamp("date").notNull(),
  status: matchStatusEnum("status").notNull(),
  result: text("result"),
  tournamentId: integer("tournament_id").references(() => tournaments.id, {
    onDelete: "set null",
  }),
  disciplineId: integer("discipline_id").references(() => disciplines.id, {
    onDelete: "set null",
  }),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tag: text("tag").notNull(),
  disciplineId: integer("discipline_id").references(() => disciplines.id, {
    onDelete: "set null",
  }),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tag: text("tag").notNull(),
  teamId: integer("team_id").references(() => teams.id, { onDelete: "cascade" }),
  disciplineId: integer("discipline_id").references(() => disciplines.id, {
    onDelete: "set null",
  }),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  videoUrl: text("video_url").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull(),
  disciplineId: integer("discipline_id").references(() => disciplines.id, {
    onDelete: "set null",
  }),
});

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  passwordHash: text("passwordHash").notNull(),
  role: userRoleEnum("role").default("user").notNull(),
});
