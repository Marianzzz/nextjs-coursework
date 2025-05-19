import type { Metadata } from 'next';
import { PageProps } from '@/lib/definitions';
import { getMatchById } from '@/app/actions/matches';
import { getAllDisciplines } from '@/app/actions/disciplines';
import { getAllTournaments } from '@/app/actions/tournaments';
import EditMatchModal from '../components/edit-match';
import { isAdmin } from '@/lib/admin';
import { notFound } from 'next/navigation';


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const numericId = Number(id);
    const match = await getMatchById(numericId);

    if (!match) {
        notFound();
    }

    return {
        title: `Матч — Mugetsu vs ${match.opponent}`,
        description: `Матч — Mugetsu vs ${match.opponent}, ${match.status} ${match.result}`,
    };
}

export default async function MatchPage({ params }: PageProps) {
    const { id } = await params;
    const numericId = Number(id);
    const matchItem = await getMatchById(numericId);

    if (!matchItem) {
        notFound();
    }

    // const discipline =
    //     matchItem.disciplineId !== null
    //         ? await getDisciplineById(matchItem.disciplineId)
    //         : null;
    const showAdmin = await isAdmin();
    const tournaments = await getAllTournaments();
    const disciplines = await getAllDisciplines();

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            {showAdmin && (
                <div className="flex items-center justify-center mb-10">
                    <EditMatchModal
                        match={matchItem}
                        tournaments={tournaments}
                        disciplines={disciplines}
                    />
                </div>
            )}
        </div>
    );
}