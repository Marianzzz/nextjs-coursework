import Link from 'next/link';
import { getAllTournaments } from '@/app/actions/tournaments';
import TournamentCard from './components/tournaments';
import Title from '@/components/title';
import { isAdmin } from '@/lib/admin';
import AddTournamentModal from './components/add-tournament';

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Турніри',
  description: 'Турніри різних дисциплін',
}


export default async function TournamentsPage() {
  const tournaments = await getAllTournaments();
  const showAdmin = await isAdmin();


  return (
    <>
      <Title>Турніри</Title>
      {tournaments.length === 0 ? <p className="text-center text-gray-500 text-sm px-4 m-5">Наразі немає жодного медіа.</p>
        : <div className="p-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tournaments.map((t) => (
              <Link href={`/tournaments/${t.id}`} key={t.id}>
                <TournamentCard key={t.id} tournament={t} />
              </Link>
            ))}
          </div>
        </div>}
      {showAdmin && (<div className="flex items-center justify-center mb-10">
        <AddTournamentModal />
      </div>)}
    </>
  );
}