import { deleteMedia, getMediaById } from "@/app/actions/media";
import MediaEdit from "../components/edit-delete-media";
import { notFound } from 'next/navigation';

export default async function MediaOperation({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const numericId = Number(id);
    const mediaItem = await getMediaById(numericId);
    if (!mediaItem) {
        notFound();
    }

    async function handleDelete() {
        "use server";
        await deleteMedia(mediaItem.id);
    }

    return <MediaEdit onDelete={handleDelete} />;
}
