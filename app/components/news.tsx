import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getLastFiveNews } from "../actions/news";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

export default async function NewsContent() {
    const news = await getLastFiveNews();
    const [first, ...rest] = news;

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="w-full border min-h-[500px] lg:flex"
        >
            <ResizablePanel defaultSize={50} minSize={40} className="lg:block hidden">
                {first && (
                    <Link href={`/news/${first.id}`} className="block relative w-full h-full min-h-[500px] overflow-hidden group">
                        {first.imageUrl && (
                            <Image
                                src={first.imageUrl}
                                alt={first.title}
                                fill
                                className="object-cover transition-all duration-300 group-hover:blur-sm"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/60">
                            <h2 className="text-white font-bold text-3xl leading-tight">
                                {first.title}
                            </h2>
                            <p className="text-white text-sm mt-2">
                                {format(new Date(first.publishedAt), "dd MMMM yyyy", {
                                    locale: uk,
                                })}
                            </p>
                            <p className="text-white font-bold text-sm mt-2">
                                {first.discipline}
                            </p>
                        </div>
                    </Link>
                )}
            </ResizablePanel>
            <ResizableHandle className="lg:block hidden" />
            <ResizablePanel defaultSize={50} minSize={30}>
                <div className="grid grid-cols-2 h-full lg:grid-cols-2 custom-md:grid-cols-1">
                    {rest.map((item, index) => (
                        <Link
                            key={item.id}
                            href={`/news/${item.id}`}
                            className={`block relative w-full h-full min-h-[150px] overflow-hidden group ${
                                index === 0 && !first ? "custom-md:col-span-1" : ""
                            }`}
                        >
                            {item.imageUrl && (
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-all duration-300 group-hover:blur-sm"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-3 transition-all duration-300 group-hover:bg-black/60">
                                <h3 className="text-white font-semibold text-sm leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-white text-xs mt-1">
                                    {format(new Date(item.publishedAt), "dd MMMM yyyy", {
                                        locale: uk,
                                    })}
                                </p>
                                <p className="text-white font-bold text-xs mt-1">
                                    {item.discipline}
                                </p>
                            </div>
                        </Link>
                    ))}
                    {first && (
                        <Link
                            href={`/news/${first.id}`}
                            className="block relative w-full h-full min-h-[150px] overflow-hidden custom-md:block lg:hidden group"
                        >
                            {first.imageUrl && (
                                <Image
                                    src={first.imageUrl}
                                    alt={first.title}
                                    fill
                                    className="object-cover transition-all duration-300 group-hover:blur-sm"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-3 transition-all duration-300 group-hover:bg-black/60">
                                <h3 className="text-white font-semibold text-sm leading-tight">
                                    {first.title}
                                </h3>
                                <p className="text-white text-xs mt-1">
                                    {format(new Date(first.publishedAt), "dd MMMM yyyy", {
                                        locale: uk,
                                    })}
                                </p>
                                <p className="text-white font-bold text-xs mt-1">
                                    {first.discipline}
                                </p>
                            </div>
                        </Link>
                    )}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}