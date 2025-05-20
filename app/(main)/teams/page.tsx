import type { Metadata } from 'next'
import TeamsCard from './components/teams'
import Title from '@/components/title';
import { getAllTeams } from '@/app/actions/teams';

export const metadata: Metadata = {
    title: 'Команди',
    description: 'Команди з різних дисциплін',
}

export default async function TeamsPage() {
    const teams = await getAllTeams();
    return (
        <>
            <Title>Команди</Title>
            <div className="w-full flex justify-center p-4">
                <div className="max-w-lg w-full">
                    <TeamsCard teams={teams} />
                </div>
            </div>
        </>);
}