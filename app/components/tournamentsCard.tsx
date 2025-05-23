import { Tournament } from '@/lib/definitions';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export default function TournamentCard({
  tournaments,
}: {
  tournaments: Tournament[];
}) {
  return (
    <div className="grid md:grid-cols-3 gap-4 w-full mx-auto">
      {tournaments.map((tournament) => (
        <div
          key={tournament.id}
          className="rounded-xl border bg-white shadow-sm p-6 space-y-4 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900">{tournament.name}</h3>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Призовий фонд:</span>{' '}
            {tournament.prizePool || 'Не вказано'}$
          </p>
          <p className="text-sm text-gray-700">
            {format(new Date(tournament.startDate), 'd MMMM yyyy', { locale: uk })} –{' '}
            {format(new Date(tournament.endDate), 'd MMMM yyyy', { locale: uk })}
          </p>
        </div>
      ))}
    </div>
  );
}
