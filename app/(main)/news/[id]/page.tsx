import type { Metadata } from "next";
import { PageProps } from "@/lib/definitions";
import { getNewsById } from "@/app/actions/news";
import { getDisciplineById } from "@/app/actions/disciplines";
import { getSession } from "@/lib/session";
import AlertSession from '@/components/alert-session'
import NewsCard from "../components/full-news";


export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { id } = await params;
    const numericId = Number(id);
    const news = await getNewsById(numericId);

    if (!news) {
        return {
            title: "Новину не знайдено",
            description: "Сторінка не знайдена або новини не існує.",
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


    const userSession = await getSession();
    return (
        <>
            {userSession
                ? <NewsCard news={newsItem} discipline={discipline} /> : <AlertSession pageLink='/news' />
            }</>
    );
}