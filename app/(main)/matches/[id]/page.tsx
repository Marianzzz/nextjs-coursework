import type { Metadata } from 'next';
import { PageProps } from '@/lib/definitions';
import { getMatchById, deleteMatch } from '@/app/actions/matches';
import { getAllDisciplines } from '@/app/actions/disciplines';
import { getAllTournaments } from '@/app/actions/tournaments';
import EditMatchModal from '../components/edit-delete-match';
import { isAdmin } from '@/lib/admin';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';


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
    const showAdmin = await isAdmin();


    if (!matchItem) {
        notFound();
    }
    if (!showAdmin) {
        redirect('/matches');
    }
    const tournaments = await getAllTournaments();
    const disciplines = await getAllDisciplines();
    async function handleDelete() {
        "use server";
        await deleteMatch(matchItem.id);
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            {showAdmin && (
                <div className="flex items-center justify-center mb-10">
                    <EditMatchModal
                        match={matchItem}
                        tournaments={tournaments}
                        disciplines={disciplines}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    );
}