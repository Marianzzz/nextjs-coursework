import Image from 'next/image';
import { Discipline, News } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewsCard({
  news,
  discipline,
  showAdmin,
  onDelete,
}: {
  news: News;
  discipline: Discipline | null;
  showAdmin: boolean;
  onDelete?: () => Promise<void>;
}) {
  return (
    <>
      <div className="rounded-xl border bg-white shadow-sm p-4 space-y-3 max-w-2xl mx-auto mt-10">
        <h2 className="text-lg font-semibold text-gray-900">{news.title}</h2>
        {discipline && (
          <h3 className="text-md font-medium text-gray-700">{discipline.name}</h3>
        )}
        {news.imageUrl ? (
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        ) : (
          <div className="relative w-full h-64 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Зображення відсутнє</span>
          </div>
        )}
        <p className="text-sm text-gray-700">{news.content}</p>
        <p className="text-xs text-gray-500">
          Опубліковано: {new Date(news.publishedAt).toLocaleDateString('uk-UA')}
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-2">
        <Link href="/news">
          <Button>До новин</Button>
        </Link>
        {showAdmin && (
          <div className="flex gap-2">
            <form action={onDelete}>
              <Button type="submit" variant="destructive">
                Видалити
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}