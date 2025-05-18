import { getAllMedia } from "@/app/actions/media";
import { isAdmin } from "@/lib/admin";
import VideoCard from "./components/video-card";
import MediaAddModal from "./components/add-media-modal";
import { getAllDisciplines } from "@/app/actions/disciplines";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import Title from "@/components/title";


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
      <Title>Медіа</Title>
      <div className="grid gap-6 md:grid-cols-3 px-10 p-4">
        {media.map((item) => {
          const edit = showAdmin ? (
            <div className="flex justify-center">
              <Link href={`/media/${item.id}`}>
                <Button>
                  Редагування
                </Button>
              </Link>
            </div>
          ) : null;

          return (
            <div key={item.id} className="flex flex-col gap-2">
              <VideoCard
                video={item}
                discipline={disciplines.find((d) => d.id === item.disciplineId) || null}
              />
              {edit}
            </div>
          );
        })}
      </div>
      {showAdmin && (
        <div className="flex items-center justify-center mb-10">
          <MediaAddModal disciplines={disciplines} />
        </div>
      )}
    </>
  );
}
