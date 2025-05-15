import { getAllMedia } from "@/app/actions/media";
import VideoCard from "@/components/video-card";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Медіа',
  description: 'Медіа контент команд та подій',
}

export default async function MediaPage() {
  const media = await getAllMedia();

  return (
    <div className="grid gap-6 md:grid-cols-3 p-10">
      {media.map((item) => (
        <VideoCard key={item.id} video={item} />
      ))}
    </div>
  );
}
