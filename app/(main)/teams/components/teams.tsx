import PlayersCard from "./players";
import { TeamsProps } from "@/lib/definitions";

export default function TeamsCard({ teams }: TeamsProps) {
    return (
        <div className="flex justify-center items-center flex-col rounded-md border bg-white shadow-sm p-3 space-y-2">
            <div className="w-full">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="p-4"
                    >
                        <h3 className="text-lg font-bold">{team.name} <span className="text-gray-500">[{team.tag}]</span></h3>
                        <p className="text-sm text-muted-foreground">
                            Дисципліна: {team.discipline?.name || "Невідомо"}
                        </p>
                    </div>
                ))}
            </div>
            <h3 className="text-lg font-bold">Гравці</h3>
            <PlayersCard />
        </div>
    );
}