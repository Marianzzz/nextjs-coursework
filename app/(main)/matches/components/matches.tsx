import { Match, Discipline } from '@/lib/definitions';
import MatchCard from './match-card';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import { isAdmin } from '@/lib/admin';

type ExtendedMatch = Match & { discipline?: Discipline | null };

export default async function MatchesByCategory({ matches }: { matches: ExtendedMatch[] }) {
    const live = matches.filter(m => m.status === 'live');
    const upcoming = matches.filter(m => m.status === 'upcoming');
    const finished = matches.filter(m => m.status === 'finished');
    const showAdmin = await isAdmin();

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:underline decoration-red-600"><h2 className="text-xl font-bold text-red-600 text-center">Live</h2></AccordionTrigger>
                    <AccordionContent>
                        {live.length > 0 && (
                            <div className="space-y-2">
                                {live.map((match) => {
                                    const edit = showAdmin ? (
                                        <div className="flex justify-center">
                                            <Link href={`/matches/${match.id}`}>
                                                <Button>Редагування</Button>
                                            </Link>
                                        </div>
                                    ) : null;

                                    return (
                                        <div key={match.id} className="flex flex-col gap-2">
                                            <MatchCard
                                                matches={match}
                                                discipline={match.discipline || null}
                                            />
                                            {edit}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="hover:underline decoration-gray-700"><h2 className="text-xl font-bold text-gray-700 text-center">Майбутні матчі</h2></AccordionTrigger>
                    <AccordionContent>
                        {upcoming.length > 0 && (
                            <div className="space-y-2">
                                {upcoming.map((match) => {
                                    const edit = showAdmin ? (
                                        <div className="flex justify-center">
                                            <Link href={`/matches/${match.id}`}>
                                                <Button>Редагування</Button>
                                            </Link>
                                        </div>
                                    ) : null;

                                    return (
                                        <div key={match.id} className="flex flex-col gap-2">
                                            <MatchCard
                                                matches={match}
                                                discipline={match.discipline || null}
                                            />
                                            {edit}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="hover:underline decoration-gray-700"><h2 className="text-xl font-bold text-gray-700 text-center">Історія матчів</h2></AccordionTrigger>
                    <AccordionContent>
                        {finished.length > 0 && (
                            <div className="space-y-2">
                                {finished.map((match) => {
                                    const edit = showAdmin ? (
                                        <div className="flex justify-center">
                                            <Link href={`/matches/${match.id}`}>
                                                <Button>Редагування</Button>
                                            </Link>
                                        </div>
                                    ) : null;

                                    return (
                                        <div key={match.id} className="flex flex-col gap-2">
                                            <MatchCard
                                                matches={match}
                                                discipline={match.discipline || null}
                                            />
                                            {edit}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
