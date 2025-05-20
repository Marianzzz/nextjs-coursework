import type { Metadata } from 'next'
import TeamsCard from './components/teams'
import Title from '@/components/title';
import { getTeamsWithPlayers } from '@/app/actions/teams';

export const metadata: Metadata = {
    title: 'Команди',
    description: 'Команди з різних дисциплін',
}

export default async function TeamsPage() {
    const teams = await getTeamsWithPlayers();

    return (
        <>
            <Title>Команди</Title>
            {teams.length === 0 ? <p className="text-center text-gray-500 text-sm px-4 m-5">Наразі немає жодного гравця.</p> : <div className="w-full flex justify-center p-4">
                <div className="max-w-4xl w-full">
                    <TeamsCard teams={teams} />
                </div>
            </div>}
        </>
    );
}