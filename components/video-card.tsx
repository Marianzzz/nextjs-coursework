'use client';

type Video = {
  id: number;
  title: string;
  videoUrl: string;
  uploadedAt: Date;
};

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-3 space-y-2">
      <h3 className="text-base font-semibold">{video.title}</h3>
      <iframe
        className="w-full aspect-video rounded-md"
        src={video.videoUrl}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <p className="text-xs text-muted-foreground">
        Додано: {new Date(video.uploadedAt).toLocaleDateString("uk-UA")}
      </p>
    </div>
  );
}
