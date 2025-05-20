import { TeamsProps } from "@/lib/definitions";
import PlayersCard from "./players";

export default function TeamsCard({ teams }: TeamsProps) {
    return (
        <div className="flex flex-col w-full gap-6">
            {teams.map((team) => (
                <div key={team.id} className="flex justify-center items-center flex-col p-4 rounded-md border bg-white shadow-sm space-y-4">
                    <h3 className="text-lg font-bold">
                        {team.name} <span className="text-gray-500">[{team.tag}]</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Дисципліна: {team.discipline?.name || "Невідомо"}
                    </p>

                    {team.players && team.players.length > 0 ? (
                        <>
                            <h4 className="text-lg font-bold">Гравці</h4>
                            <PlayersCard players={team.players} />
                        </>
                    ) : <p className="text-center text-gray-500 text-sm px-4 m-5">Наразі немає жодного гравця.</p>}
                </div>
            ))}
        </div>
    );
}
