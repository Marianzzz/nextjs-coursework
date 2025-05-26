import { TeamsProps } from "@/lib/definitions";
import PlayersCard from "./players";
import { isAdmin } from "@/lib/admin";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TeamsCard({ teams }: TeamsProps) {
    const showAdmin = await isAdmin();
    return (
        <div className="flex flex-col w-full gap-6">
            {teams.length > 0 && (
                <div className="flex flex-col w-full gap-6">
                    {teams.map((team) => {
                        const edit = showAdmin ? (
                            <div className="flex justify-center">
                                <Link href={`/teams/${team.id}`}>
                                    <Button>Редагування</Button>
                                </Link>
                            </div>
                        ) : null;

                        return (
                            <div
                                key={team.id}
                                className="flex justify-center items-center flex-col p-4 rounded-md border bg-white shadow-sm space-y-4"
                            >
                                <h2 className="text-lg font-bold">
                                    {team.name} <span className="text-gray-500">[{team.tag}]</span>
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Дисципліна: {team.discipline?.name || "Невідомо"}
                                </p>

                                {team.players && team.players.length > 0 ? (
                                    <>
                                        <h3 className="text-lg font-bold">Гравці</h3>
                                        <PlayersCard players={team.players} />
                                    </>
                                ) : (
                                    <p className="text-center text-gray-500 text-sm px-4 m-5">
                                        Наразі немає жодного гравця.
                                    </p>
                                )}
                                {edit}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
