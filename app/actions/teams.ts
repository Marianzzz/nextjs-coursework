"use server";
import { db } from "@/db/db";
import { teams, disciplines } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllTeams() {
  return await db
    .select({
      id: teams.id,
      name: teams.name,
      tag: teams.tag,
      discipline: {
        id: disciplines.id,
        name: disciplines.name,
      },
    })
    .from(teams)
    .leftJoin(disciplines, eq(teams.disciplineId, disciplines.id));
}
