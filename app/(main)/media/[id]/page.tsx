import { deleteMedia, getMediaById } from "@/app/actions/media";
import MediaEdit from "../components/edit-delete-media";
import { getAllDisciplines } from "@/app/actions/disciplines";
import { notFound } from 'next/navigation';
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function MediaOperation({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const numericId = Number(id);
    const mediaItem = await getMediaById(numericId);
    const disciplines = await getAllDisciplines();
    const showAdmin = await isAdmin();

    if (!mediaItem) {
        notFound();
    }
    if (!showAdmin) {
        redirect('/media');
    }

    async function handleDelete() {
        "use server";
        await deleteMedia(mediaItem.id);
    }

    return <MediaEdit media={mediaItem} disciplines={disciplines} onDelete={handleDelete} />;
}
