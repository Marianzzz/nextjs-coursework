CREATE TYPE "public"."match_status" AS ENUM('live', 'finished', 'upcoming');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
ALTER TABLE "tournaments" DROP CONSTRAINT "tournaments_discipline_id_disciplines_id_fk";
--> statement-breakpoint
ALTER TABLE "tournaments" DROP COLUMN "discipline_id";