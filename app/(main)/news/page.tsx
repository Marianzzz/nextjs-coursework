import { getAllNews } from '@/app/actions/news';
import NewsAddModal from './components/add-news-modal';
import NewsCards from './components/news';
import { isAdmin } from "@/lib/admin";
import { getAllDisciplines } from "@/app/actions/disciplines";
import Link from 'next/link';
import Title from '@/components/title';

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Новини',
  description: 'Новини про організацію, команди, турніри',
}

export default async function NewsPage() {
  const news = await getAllNews();
  const allDisciplines = await getAllDisciplines();
  const showAdmin = await isAdmin();


  return (
    <>
      <Title>Новини</Title>
      <div className="grid gap-6 md:grid-cols-3 px-10 p-4">
        {news.map((n) => (
          <Link href={`/news/${n.id}`} key={n.id}>
            <NewsCards
              key={n.id}
              news={n}
              discipline={allDisciplines.find((d) => d.id === n.disciplineId) || null}
            />
          </Link>
        ))}

      </div>
      {showAdmin && (
        <div className="flex items-center justify-center mb-10">
          <NewsAddModal disciplines={allDisciplines} />
        </div>
      )}
    </>
  );
}