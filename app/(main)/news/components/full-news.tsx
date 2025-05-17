'use client';

import Image from 'next/image';
import { Discipline, News } from '@/lib/definitions';

export default function NewsCard({
  news,
  discipline,
}: {
  news: News;
  discipline: Discipline | null;
}) {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-3 space-y-2">
      <h3 className="text-base font-semibold">{news.title}</h3>
      {discipline && <h4 className="text-base font-semibold">{discipline.name}</h4>}

      {news.imageUrl && (
        <div className="relative w-full overflow-hidden rounded-md">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            onError={() =>
              console.error(`Помилка завантаження зображення: ${news.imageUrl}`)
            }
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Опубліковано: {new Date(news.publishedAt).toLocaleDateString('uk-UA')}
      </p>
    </div>
  );
}
