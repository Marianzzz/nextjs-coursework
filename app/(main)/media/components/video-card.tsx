import { Video } from "@/lib/definitions";
import { Discipline } from "@/lib/definitions";

export default function VideoCard({
  video,
  discipline,
}: {
  video: Video;
  discipline: Discipline | null;
}) {
  const videoUrl = video.videoUrl.replace("youtube.com", "youtube-nocookie.com");
  const videoId = video.id || video.videoUrl.split("/embed/")[1]?.split("?")[0];

  return (
    <>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "${video.title}",
            "thumbnailUrl": "https://img.youtube.com/vi/${videoId}/hqdefault.jpg",
            "uploadDate": "${new Date(video.uploadedAt).toISOString()}",
            "contentUrl": "${videoUrl}"
          }
        `}
      </script>
      <div className="rounded-xl border bg-white shadow-sm p-3 space-y-2">
        <h2 className="text-base font-semibold">{video.title}</h2>
        {discipline && <h3 className="text-base font-semibold">{discipline.name}</h3>}
        <iframe
          className="w-full aspect-video rounded-md"
          src={videoUrl} 
          data-cookieconsent="marketing"
          title={`${video.title} - ${discipline?.name || "Відео"}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <p className="text-xs text-muted-foreground">
          Додано: {new Date(video.uploadedAt).toLocaleDateString("uk-UA")}
        </p>
      </div>
    </>
  );
}