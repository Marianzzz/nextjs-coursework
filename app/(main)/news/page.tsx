import { getAllNews } from '@/app/actions/news';
import NewsAddModal from './components/add-news-modal';
import NewsCard from './components/news';
import { isAdmin } from "@/lib/admin";
import { getAllDisciplines } from "@/app/actions/disciplines";

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
      <div className="grid gap-6 md:grid-cols-3 p-10">
        {news.map((n) => (
          <NewsCard
            key={n.id}
            news={n}
            discipline={allDisciplines.find((d) => d.id === n.disciplineId) || null}
          />
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