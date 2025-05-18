import type { Metadata } from 'next';
import { PageProps } from '@/lib/definitions';
import { getTournamentById } from '@/app/actions/tournaments';
import { notFound } from 'next/navigation';

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

export default async function TournamentsPage() {


    return (
        <>

        </>
    );
}