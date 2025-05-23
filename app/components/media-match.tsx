import MatchesByCategory from "./match";
import Media from "./media";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MediaMatch() {
    return (
        <div className="flex flex-col [@media(min-width:670px)]:flex-row gap-4 w-full min-h-[500px] overflow-hidden">
            <div className="w-full [@media(min-width:670px)]:w-[70%] h-full overflow-auto py-4">
                <h2 className="text-xl font-bold pb-2 text-center md:text-left ">Медіа</h2>
                <Media />
                <div className="flex items-center justify-center py-4">
                    <Link href="/media">
                        <Button>Більше медіа</Button>
                    </Link>
                </div>
            </div>

            <div className="w-full [@media(min-width:670px)]:w-[30%] h-full overflow-auto py-4">
                <MatchesByCategory />
                <div className="flex items-center justify-center py-4">
                    <Link href="/matches">
                        <Button>Більше матчів</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
