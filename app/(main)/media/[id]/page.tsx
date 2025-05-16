import { deleteMedia, getMediaById } from "@/app/actions/media";
import MediaEdit from "../components/edit-delete-media";
import { getAllDisciplines } from "@/app/actions/disciplines";
import { notFound } from 'next/navigation';
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { PageProps } from "@/lib/definitions";


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  const media = await getMediaById(numericId);

  if (!media) {
    return {
      title: "Медіа не знайдено",
      description: "Сторінка не знайдена або медіа не існує.",
    };
  }

  return {
    title: `Редагування медіа — ${media.title}`,
    description: `Сторінка редагування медіафайлу: ${media.title}`,
  };
}

export default async function MediaOperation({ params }: PageProps) {
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