import type { Metadata } from 'next';
import { PageProps } from '@/lib/definitions';
import { notFound } from 'next/navigation';
import { getPlayerById } from '@/app/actions/players';
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

    return <h1>Гравець</h1>
}