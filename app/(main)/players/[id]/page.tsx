import type { Metadata } from 'next';
import { PageProps } from '@/lib/definitions';
import { notFound } from 'next/navigation';
import { deletePlayer, getPlayerById } from '@/app/actions/players';
import EditPlayerModal from '../components/edit-delete-player';
import { getAllDisciplines } from '@/app/actions/disciplines';
import { getTeamsForSelect } from '@/app/actions/teams';
import { isAdmin } from '@/lib/admin';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const numericId = Number(id);
    const player = await getPlayerById(numericId);

    if (!player) {
        notFound();
    }

    return {
        title: `Гравець — ${player.name}[${player.tag}]`,
        description: `Сторінка редагування гравця — ${player.name}[${player.tag}]`,
    };
}

export default async function playerPage({ params }: PageProps) {
    const { id } = await params;
    const numericId = Number(id);
    const playerItem = await getPlayerById(numericId);
    const showAdmin = await isAdmin();

    if (!playerItem) {
        notFound();
    }
    if (!showAdmin) {
        redirect('/teams');
    }
    const disciplines = await getAllDisciplines();
    const teams = await getTeamsForSelect();

    async function handleDelete() {
        "use server";
        await deletePlayer(playerItem.id);
    }

    return (
        <EditPlayerModal
            player={playerItem}
            onDelete={handleDelete}
            disciplines={disciplines}
            teams={teams}
        />
    );
}