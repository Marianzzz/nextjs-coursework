"use server";
import { db } from "@/db/db";
import { teams, disciplines, players } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TeamFormState, TeamSchema } from "@/lib/definitions";
import { revalidatePath } from "next/cache";

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
export async function getTeamsWithPlayers() {
  const result = await db
    .select({
      teamId: teams.id,
      teamName: teams.name,
      teamTag: teams.tag,
      discipline: {
        id: disciplines.id,
        name: disciplines.name,
      },
      player: {
        id: players.id,
        name: players.name,
        tag: players.tag,
        teamId: players.teamId,
      },
    })
    .from(teams)
    .leftJoin(disciplines, eq(teams.disciplineId, disciplines.id))
    .leftJoin(players, eq(players.teamId, teams.id));

  const teamMap = new Map<
    number,
    {
      id: number;
      name: string;
      tag: string;
      discipline: { id: number; name: string } | null;
      players: { id: number; name: string; tag: string }[];
    }
  >();

  for (const row of result) {
    if (!teamMap.has(row.teamId)) {
      teamMap.set(row.teamId, {
        id: row.teamId,
        name: row.teamName,
        tag: row.teamTag,
        discipline: row.discipline,
        players: [],
      });
    }

    if (row.player?.id) {
      teamMap.get(row.teamId)?.players.push({
        id: row.player.id,
        name: row.player.name,
        tag: row.player.tag,
      });
    }
  }

  return Array.from(teamMap.values());
}
export async function addTeam(formData: FormData): Promise<TeamFormState> {
  const raw = {
    name: formData.get("name"),
    tag: formData.get("tag"),
    disciplineId:
      formData.get("disciplineId") !== 'none'
        ? Number(formData.get("disciplineId"))
        : undefined,
  };

  const result = TeamSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        name: errors.name,
        tag: errors.tag,
        disciplineId: errors.disciplineId,
      },
    };
  }

  try {
    await db
      .insert(teams)
      .values({
        name: result.data.name,
        tag: result.data.tag,
        disciplineId: result.data.disciplineId,
      })
      .returning();

    revalidatePath("/teams");
    return {
      message: "Команду успішно додано.",
    };
  } catch (error) {
    console.error("Помилка при додаванні команди:", error);
    return {
      message: "Не вдалося додати команду. Спробуйте пізніше.",
    };
  }
}
