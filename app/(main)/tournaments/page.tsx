import Link from 'next/link';
import { getAllTournaments } from '@/app/actions/tournaments';
import TournamentCard from './components/tournaments';

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Турніри',
  description: 'Турніри різних дисциплін',
}


export default async function TournamentsPage() {
  const tournaments = await getAllTournaments();

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {tournaments.map((t) => (
          <Link href={`/tournaments/${t.id}`} key={t.id}>
            <TournamentCard key={t.id} tournament={t} />
          </Link>
        ))}
      </div>
    </div>
  );
}