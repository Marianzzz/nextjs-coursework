import type { Metadata } from 'next';
import { PageProps } from '@/lib/definitions';
import { getNewsById } from '@/app/actions/news';
import { getDisciplineById, getAllDisciplines } from '@/app/actions/disciplines';
import { getSession } from '@/lib/session';
import { isAdmin } from '@/lib/admin';
import AlertSession from '@/components/alert-session';
import NewsCard from '../components/full-news';
import EditNewsModal from '../components/edit-delete-news';
import { deleteNews } from '@/app/actions/news';

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { id } = await params;
    const numericId = Number(id);
    const news = await getNewsById(numericId);

    if (!news) {
        return {
            title: 'Новину не знайдено',
            description: 'Сторінка не знайдена або новини не існує.',
        };
    }

    return {
        title: `Новина — ${news.title}`,
        description: news.content,
    };
}

export default async function NewsPage({ params }: PageProps) {
    const { id } = await params;
    const numericId = Number(id);
    const newsItem = await getNewsById(numericId);

    const discipline =
        newsItem.disciplineId !== null
            ? await getDisciplineById(newsItem.disciplineId)
            : null;
    const disciplines = await getAllDisciplines();
    const showAdmin = await isAdmin();
    const userSession = await getSession();

    async function handleDelete() {
        'use server';
        await deleteNews(newsItem.id);
    }

    return (
        <>
            {userSession ? (
                <>
                    <NewsCard
                        news={newsItem}
                        discipline={discipline}
                        showAdmin={showAdmin}
                        onDelete={handleDelete}
                    />
                    {showAdmin && (
                        <div className="mt-4 flex justify-center">
                            <EditNewsModal news={newsItem} disciplines={disciplines} />
                        </div>
                    )}
                </>
            ) : (
                <AlertSession pageLink="/news" />
            )}
        </>
    );
}