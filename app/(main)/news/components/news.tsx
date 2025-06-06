import Image from 'next/image';
import { Discipline, News } from '@/lib/definitions';

export default function NewsCards({
  news,
  discipline,
}: {
  news: News;
  discipline: Discipline | null;
}) {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-3 space-y-2 hover:bg-accent">
      <h2 className="text-base font-semibold">{news.title}</h2>
      {discipline && <h3 className="text-base font-semibold">{discipline.name}</h3>}

      {news.imageUrl && (
        <div className="relative w-full overflow-hidden rounded-md aspect-[3/2]">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
            priority={false}
          />
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Опубліковано: {new Date(news.publishedAt).toLocaleDateString('uk-UA')}
      </p>
    </div>
  );
}
