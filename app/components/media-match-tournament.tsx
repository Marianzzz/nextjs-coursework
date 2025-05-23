import MatchesByCategory from "./match";
import Media from "./media";
import Tournament from "./tournaments";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MediaMatchTournament() {
  return (
    <div className="w-full flex flex-col xl:flex-row min-h-[500px]">
      <div className="w-full xl:w-7/10 flex flex-col overflow-auto">
        <div className="py-4 flex flex-col flex-1 gap-2">
          <section>
            <h2 className="text-xl font-bold pb-2 text-center xl:text-left">Медіа</h2>
            <Media />
            <div className="flex items-center justify-center py-4">
              <Link href="/media">
                <Button>Більше медіа</Button>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold pb-2 text-center xl:text-left">Турніри</h2>
            <Tournament />
            <div className="flex items-center justify-center py-4">
              <Link href="/tournaments">
                <Button>Більше турнірів</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="w-full xl:w-3/10 flex flex-col overflow-auto py-4 px-4">
        <h2 className="text-xl font-bold pb-2 text-center xl:text-left">Матчі</h2>
        <div className="flex-1 overflow-y-auto">
          <MatchesByCategory />
        </div>
        <div className="flex items-center justify-center py-4">
          <Link href="/matches">
            <Button>Більше матчів</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}