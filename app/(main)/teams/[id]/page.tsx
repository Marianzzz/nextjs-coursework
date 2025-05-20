import type { Metadata } from 'next';
import { PageProps } from '@/lib/definitions';
import { getTeamById, deleteTeam } from '@/app/actions/teams';
import { notFound } from 'next/navigation';
import { isAdmin } from '@/lib/admin';
import EditTeamModal from '../components/edit-delete-teams';
import { redirect } from 'next/navigation';
import { getAllDisciplines } from '@/app/actions/disciplines';


export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { id } = await params;
    const numericId = Number(id);
    const team = await getTeamById(numericId);

    if (!team) {
        notFound();
    }

    return {
        title: `Команда — ${team.name}[${team.tag}]`,
        description: `Команда — ${team.name}[${team.tag}]`,
    };
}

export default async function TournamentsPage({ params }: PageProps) {
    const { id } = await params;
    const numericId = Number(id);
    const teamItem = await getTeamById(numericId);
    const showAdmin = await isAdmin();

     if (!teamItem) {
            notFound();
        }
        if (!showAdmin) {
            redirect('/teams');
        }
        const disciplines = await getAllDisciplines();

        async function handleDelete() {
            "use server";
            await deleteTeam(teamItem.id);
        }
    return (
        <div className="max-w-2xl mx-auto space-y-4">
            {showAdmin && (
                <div className="flex items-center justify-center mb-10">
                    <EditTeamModal
                        team={teamItem}
                        disciplines={disciplines}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    )
}