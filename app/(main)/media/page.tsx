
import { getAllMedia } from "@/app/actions/media";
import { isAdmin } from "@/lib/admin";
import VideoCard from "@/components/video-card";
import MediaAddModal from "@/components/add-media-modal";
import { getAllDisciplines } from "@/app/actions/disciplines";


import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Медіа',
  description: 'Медіа контент команд та подій',
}

export default async function MediaPage() {
  const media = await getAllMedia();
  const disciplines = await getAllDisciplines();
  const showAdmin = await isAdmin();
  return (
    <>
      <div className="grid gap-6 md:grid-cols-3 p-10">
        {media.map((item) => (
          <VideoCard key={item.id} video={item} discipline={
            disciplines.find((d) => d.id === item.disciplineId) || null
          } />
        ))}
      </div>
      {showAdmin && <div className="flex items-center justify-center mb-10">
        <MediaAddModal disciplines={disciplines} />
      </div>}
    </>
  );
}
