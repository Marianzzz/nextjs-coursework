import { isAdmin } from "@/lib/admin";
import { PlayersCardProps } from "@/lib/definitions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function PlayersCard({ players }: PlayersCardProps) {
  const showAdmin = await isAdmin();

  const showNavigation = players.length > 3;

  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-4xl px-4">
      <CarouselContent>
        {players.map((player) => (
          <CarouselItem
            key={player.id}
            className="basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <div className="p-2">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2 text-center">
                  <span className="text-base sm:text-lg font-semibold">
                    {player.name}
                  </span>
                  <span className="text-sm text-muted-foreground break-words">
                    [{player.tag}]
                  </span>
                  {showAdmin && (
                    <Link href={`/players/${player.id}`}>
                      <Button>Редагування</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {showNavigation && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
