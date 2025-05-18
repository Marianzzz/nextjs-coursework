import { Match, Discipline } from '@/lib/definitions';
import MatchCard from './match-tournament';

type ExtendedMatch = Match & { discipline?: Discipline | null };

export default function MatchesByCategory({ matches }: { matches: ExtendedMatch[] }) {
    const live = matches.filter(m => m.status === 'live');
    const upcoming = matches.filter(m => m.status === 'upcoming');
    const finished = matches.filter(m => m.status === 'finished');

    return (
        <div className="max-w-xl mx-auto space-y-8">
            {live.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-red-600 text-center">Live</h3>
                    {live.map((match) => (
                        <MatchCard key={match.id} match={match} discipline={match.discipline || null} />
                    ))}
                </div>
            )}

            {upcoming.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-700 text-center">Майбутні матчі</h3>
                    {upcoming.map((match) => (
                        <MatchCard key={match.id} match={match} discipline={match.discipline || null} />
                    ))}
                </div>
            )}

            {finished.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-700 text-center">Історія матчів</h3>
                    {finished.map((match) => (
                        <MatchCard key={match.id} match={match} discipline={match.discipline || null} />
                    ))}
                </div>
            )}
        </div>
    );
}
