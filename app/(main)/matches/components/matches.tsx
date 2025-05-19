import { Match, Discipline } from '@/lib/definitions';
import MatchCard from './match-card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type ExtendedMatch = Match & { discipline?: Discipline | null };

export default function MatchesByCategory({ matches }: { matches: ExtendedMatch[] }) {
    const live = matches.filter(m => m.status === 'live');
    const upcoming = matches.filter(m => m.status === 'upcoming');
    const finished = matches.filter(m => m.status === 'finished');

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:underline decoration-red-600"><h3 className="text-xl font-bold text-red-600 text-center">Live</h3></AccordionTrigger>
                    <AccordionContent>
                        {live.length > 0 && (
                            <div className="space-y-2">
                                {live.map((match) => (
                                    <MatchCard key={match.id} matches={match} discipline={match.discipline || null} />
                                ))}
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="hover:underline decoration-gray-700"><h3 className="text-xl font-bold text-gray-700 text-center">Майбутні матчі</h3></AccordionTrigger>
                    <AccordionContent>
                        {upcoming.length > 0 && (
                            <div className="space-y-2">
                                {upcoming.map((match) => (
                                    <MatchCard key={match.id} matches={match} discipline={match.discipline || null} />
                                ))}
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="hover:underline decoration-gray-700"><h3 className="text-xl font-bold text-gray-700 text-center">Історія матчів</h3></AccordionTrigger>
                    <AccordionContent>
                        {finished.length > 0 && (
                            <div className="space-y-2">
                                {finished.map((match) => (
                                    <MatchCard key={match.id} matches={match} discipline={match.discipline || null} />
                                ))}
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
