import { Tournament } from '@/lib/definitions';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';


export default function TournamentCard({
    tournament,
}: {
    tournament: Tournament;
}) {
    return (
        <div className="rounded-xl border bg-white shadow-sm p-6 space-y-4 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">{tournament.name}</h3>
            <div className="space-y-2">
                <p className="text-sm text-gray-700">
                    <span className="font-medium">Призовий фонд:</span>{' '}
                    {tournament.prizePool || 'Not specified'}$
                </p>
                <p className="text-sm text-gray-700">
                    {format(new Date(tournament.startDate), 'd MMMM yyyy', { locale: uk })} -{' '}
                    {format(new Date(tournament.endDate), 'd MMMM yyyy', { locale: uk })}
                </p>
            </div>
        </div>
    );
}