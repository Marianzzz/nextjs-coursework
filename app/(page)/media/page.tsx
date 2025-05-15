import { getAllMedia } from "@/app/actions/media";
import VideoCard from "@/components/video-card";

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
