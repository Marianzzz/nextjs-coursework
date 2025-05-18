import type { Metadata } from 'next';
import { PageProps } from '@/lib/definitions';
import { getTournamentById } from '@/app/actions/tournaments';
import { getMatchesByTournamentId } from '@/app/actions/matches';
import { notFound } from 'next/navigation';
import TournamentCard from '../components/tournament';
import { getDisciplineById } from '@/app/actions/disciplines';
import MatchesByCategory from '../components/matches-status';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


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

    return (
        <div className="space-y-6 py-6 p-4">
            <TournamentCard tournament={tournament} />
            <div className="max-w-2xl mx-auto space-y-4">
                {matchesWithDisciplines.length > 0 ? (
                    <MatchesByCategory matches={matchesWithDisciplines} />
                ) : (
                    <p className="text-center text-sm text-gray-500">Матчі цього турніру ще не додані.</p>
                )}
                <div className='flex justify-center'>
                    <Link href="/tournaments">
                        <Button>До новин</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}