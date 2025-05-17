import type { Metadata } from "next";
import { PageProps } from "@/lib/definitions";
import { getNewsById } from "@/app/actions/news";
// import { getAllDisciplines } from "@/app/actions/disciplines";
import { getSession } from "@/lib/session";
import AlertSession from '@/components/alert-session'


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
        description: `Сторінка новини: ${news.title}`,
    };
}
export default async function NewsPage() {

    const userSession = await getSession();
    return (
        <>
            {userSession
                ? <h1>Привіт</h1> : <AlertSession pageLink='/news' />
            }</>
    );
}