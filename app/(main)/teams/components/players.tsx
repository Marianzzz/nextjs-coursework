import { PlayersCardProps } from "@/lib/definitions";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";



export default function PlayersCard({ players }: PlayersCardProps) {
    if (players.length === 0) return null;

    return (
        <Carousel
            opts={{ align: "start" }}
            className="w-full max-w-xl"
        >
            <CarouselContent>
                {players.map((player) => (
                    <CarouselItem key={player.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2">
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                                    <span className="text-xl font-semibold">{player.name}</span>
                                    <span className="text-sm text-muted-foreground">[{player.tag}]</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
