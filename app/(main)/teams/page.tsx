import type { Metadata } from 'next'
import TeamsCard from './components/teams'
import Title from '@/components/title';
import { getTeamsWithPlayers } from '@/app/actions/teams';
import { isAdmin } from '@/lib/admin';
import { getAllDisciplines } from '@/app/actions/disciplines';
import TeamsAddModal from './components/add-teams-modal';
import PlayersAddModal from './components/add-player-modal';

export const metadata: Metadata = {
    title: 'Команди',
    description: 'Команди з різних дисциплін',
}

export default async function TeamsPage() {
    const teams = await getTeamsWithPlayers();
      const allDisciplines = await getAllDisciplines();
      const showAdmin = await isAdmin();
    

    return (
        <>
            <Title>Команди</Title>
            {teams.length === 0 ? <p className="text-center text-gray-500 text-sm px-4 m-5">Наразі немає жодної команди.</p> : <div className="w-full flex justify-center p-4">
                <div className="max-w-7xl w-full">
                    <TeamsCard teams={teams} />
                </div>
            </div>}
            {showAdmin && (
                <div className="flex items-center justify-center mb-10 gap-4">
                    <TeamsAddModal disciplines={allDisciplines} />
                    <PlayersAddModal teams={teams} disciplines={allDisciplines}/>
                </div>
            )}
        </>
    );
}