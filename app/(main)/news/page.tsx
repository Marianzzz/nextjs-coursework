import NewsCard from "./components/news";
import { getAllNews } from "@/app/actions/news";
import { getAllDisciplines } from "@/app/actions/disciplines";

export default async function NewsPage() {
  const news = await getAllNews();
  const disciplines = await getAllDisciplines();

  return (
    <div className="grid gap-6 md:grid-cols-3 p-10">
      {news.map((newsItem) => {
        const discipline = disciplines.find((d) => d.id === newsItem.disciplineId) || null;
        return (
          <NewsCard
            key={newsItem.id}
            news={newsItem}
            discipline={discipline}
          />
        );
      })}
    </div>
  );
}