import Title from "@/components/title";
import { getAllMatches } from "@/app/actions/matches";
import MatchesByCategory from "./components/matches";
import { getAllDisciplines } from "@/app/actions/disciplines";
import { getAllTournaments } from "@/app/actions/tournaments";
import MatchAddModal from "./components/add-matche-modal";
import { isAdmin } from "@/lib/admin";
import type { Discipline } from "@/lib/definitions";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Матчі",
    description: "Матчі з детальними описами",
};

export default async function MatchesPage() {
    const matches = await getAllMatches();
    const allDisciplines: Discipline[] = await getAllDisciplines();
    const allTournaments = await getAllTournaments();
    const showAdmin = await isAdmin();

    const matchesWithDisciplines = matches.map((match) => ({
        ...match,
        discipline: allDisciplines.find((d) => d.id === match.disciplineId) || null,
    }));

    return (
        <>
            <Title>Матчі</Title>
            {matches.length === 0 ? (
                <p className="text-center text-gray-500 text-sm px-4 m-5">
                    Наразі немає жодного матчу.
                </p>
            ) : (
                <div className="px-10 p-4">
                    <MatchesByCategory matches={matchesWithDisciplines} />
                </div>
            )}
            {showAdmin && (
                <div className="flex items-center justify-center mb-10">
                    <MatchAddModal
                        disciplines={allDisciplines}
                        tournaments={allTournaments}
                    />
                </div>
            )}
        </>
    );
}
