'use client';

import { Discipline, News } from "@/lib/definitions";

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
        <img
          className="w-full h-48 object-cover rounded-md"
          src={news.imageUrl}
          alt={news.title}
        />
      )}
      <p className="text-sm text-gray-700">{news.content}</p>
      <p className="text-xs text-muted-foreground">
        Опубліковано: {new Date(news.publishedAt).toLocaleDateString("uk-UA")}
      </p>
    </div>
  );
}