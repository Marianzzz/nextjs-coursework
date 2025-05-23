import MatchCard from './matchCard'; 
import { getLastTenMatches } from '@/app/actions/matches'


export default async function MatchesByCategory() {
    const matches = await getLastTenMatches();
    const live = matches.filter(m => m.status === 'live');
    const upcoming = matches.filter(m => m.status === 'upcoming');
    const finished = matches.filter(m => m.status === 'finished');

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div>
                <h3 className="text-xl font-bold text-red-600 text-center md:text-left">Live</h3>
                {live.length > 0 ? (
                    live.map((match) => (
                        <MatchCard key={match.id} match={match} />
                    ))
                ) : (
                    <div className="text-center">Немає активних матчів</div>
                )}
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-700 text-center md:text-left">Майбутні матчі</h3>
                {upcoming.length > 0 ? (
                    upcoming.map((match) => (
                        <MatchCard key={match.id} match={match} />
                    ))
                ) : (
                    <div className="text-center">Немає майбутніх матчів</div>
                )}
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-700 text-center md:text-left">Історія матчів</h3>
                {finished.length > 0 ? (
                    finished.map((match) => (
                        <MatchCard key={match.id} match={match} />
                    ))
                ) : (
                    <div className="text-center">Немає завершених матчів</div>
                )}
            </div>
        </div>
    );
}