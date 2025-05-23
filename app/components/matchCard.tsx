import { Match, Discipline } from '@/lib/definitions';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

type ExtendedMatch = Match & { discipline?: Discipline | null };

export default function MatchCard({ match }: { match: ExtendedMatch }) {
    return (
        <div key={match.id} className="rounded-md border bg-white shadow-sm p-3 space-y-2 mb-2">
            <h4 className="text-base font-semibold text-gray-900 text-center">
                Mugetsu vs {match.opponent}
            </h4>
            <div className="space-y-1 text-sm text-gray-700">
                {match.status === 'live' ? (
                    ''
                ) : (
                    <p className="text-center">
                        {format(new Date(match.date), 'd MMMM yyyy, HH:mm', { locale: uk })}
                    </p>
                )}
                {match.result && <p className="text-center">{match.result}</p>}
                {match.discipline && <p className="text-left">Дисципліна: {match.discipline.name}</p>}
            </div>
        </div>
    );
}