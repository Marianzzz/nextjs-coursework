import { Discipline, Match } from '@/lib/definitions';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export default function MatchCard({
    matches,
    discipline,
}: {
    matches: Match;
    discipline: Discipline | null;
}) {
    return (
        <div className="rounded-md border bg-white shadow-sm p-3 space-y-2">
            <h3 className="text-base font-semibold text-gray-900 text-center">
                Mugetsu vs {matches.opponent}
            </h3>
            <div className="space-y-1 text-sm text-gray-700">
                {matches.status === 'live' ? (
                    ''
                ) : (
                    <p className='text-center' >{format(new Date(matches.date), 'd MMMM yyyy, HH:mm', { locale: uk })}</p>
                )}
                {matches.result && <p className='text-center'>{matches.result}</p>}
                {discipline && <p className='text-left'>Дисципліна: {discipline.name}</p>}
            </div>
        </div>
    );
}
