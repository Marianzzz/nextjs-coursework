import type { Metadata } from 'next';
import { PageProps } from '@/lib/definitions';
import { getTournamentById, deleteTournament } from '@/app/actions/tournaments';
import { getMatchesByTournamentId } from '@/app/actions/matches';
import { notFound } from 'next/navigation';
import TournamentCard from '../components/tournament';
import { getDisciplineById } from '@/app/actions/disciplines';
import MatchesByCategory from '../components/matches-status';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { isAdmin } from '@/lib/admin';
import EditTournamentModal from '../components/edit-delete-tournaments';


export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { id } = await params;
    const numericId = Number(id);
    const tournament = await getTournamentById(numericId);

    if (!tournament) {
        notFound();
    }

    return {
        title: `Турнір — ${tournament.name}`,
        description: `Сторінка турніра — ${tournament.name} з матчами.`,
    };
}

export default async function TournamentsPage({ params }: PageProps) {
    const { id } = await params;
    const numericId = Number(id);

    const tournament = await getTournamentById(numericId);

    if (!tournament) {
        notFound();
    }
    const matches = await getMatchesByTournamentId(numericId);
    const matchesWithDisciplines = await Promise.all(
        matches.map(async (match) => {
            const discipline = match.disciplineId
                ? await getDisciplineById(match.disciplineId)
                : null;

            return {
                ...match,
                discipline,
            };
        })
    );
    const showAdmin = await isAdmin();
    async function handleDelete() {
        'use server';
        await deleteTournament(tournament.id);
    }

    return (
        <div className="space-y-6 py-6 p-4">
            <TournamentCard tournament={tournament} />
            <div className="max-w-2xl mx-auto space-y-4">
                {matchesWithDisciplines.length > 0 ? (
                    <MatchesByCategory matches={matchesWithDisciplines} />
                ) : (
                    <p className="text-center text-sm text-gray-500">Матчі цього турніру ще не додані.</p>
                )}
                <div className='flex justify-center gap-4'>
                    <Link href="/tournaments">
                        <Button>До турнірів</Button>
                    </Link>
                    {showAdmin && (
                        <form action={handleDelete}>
                            <Button type="submit" variant="destructive">
                                Видалити
                            </Button>
                        </form>
                    )}
                </div>
                {showAdmin && (
                    <div className="flex items-center justify-center mb-10">
                        <EditTournamentModal tournament={tournament} />
                    </div>
                )}
            </div>
        </div>
    );
}