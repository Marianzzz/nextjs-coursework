import VideoCard from "./videoCard";
import { getLastSixMedia } from "@/app/actions/media";

export default async function Media() {
    const mediaItems = await getLastSixMedia();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mediaItems.length > 0 ? (
                mediaItems.map((media) => (
                    <VideoCard
                        key={media.id}
                        video={media}
                        discipline={media.discipline}
                    />
                ))
            ) : (
                <div className="text-center col-span-2">Немає медіа для відображення</div>
            )}
        </div>
    );
}