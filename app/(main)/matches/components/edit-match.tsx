'use client';

import { useActionState, useState } from 'react';
import { updateMatch } from '@/app/actions/matches';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MatchFormState, Match } from '@/lib/definitions';
import Link from 'next/link';

type FormMatch = {
  tournaments: { id: number; name: string; startDate: string; endDate: string }[];
  disciplines: { id: number; name: string }[];
};

export default function EditMatchModal({
  match,
  tournaments,
  disciplines,
}: { match: Match } & FormMatch) {
  const [opponent, setOpponent] = useState(match.opponent);
  const [date, setDate] = useState(
    match.date ? new Date(match.date).toISOString().slice(0, 16) : ''
  );
  const [status, setStatus] = useState(match.status);
  const [result, setResult] = useState(match.result ?? '');
  const [tournamentId, setTournamentId] = useState<string>(
    match.tournamentId?.toString() || 'none'
  );
  const [disciplineId, setDisciplineId] = useState<string>(
    match.disciplineId?.toString() || 'none'
  );

  const actionHandler = async (_prevState: MatchFormState, formData: FormData) => {
    formData.set('id', match.id.toString());
    const tournamentIdRaw = formData.get('tournamentId');
    const disciplineIdRaw = formData.get('disciplineId');

    const tournamentId =
      tournamentIdRaw && tournamentIdRaw !== 'none'
        ? Number(tournamentIdRaw)
        : undefined;
    const disciplineId =
      disciplineIdRaw && disciplineIdRaw !== 'none'
        ? Number(disciplineIdRaw)
        : undefined;

    if (tournamentId !== undefined) {
      formData.set('tournamentId', tournamentId.toString());
    } else {
      formData.delete('tournamentId');
    }
    if (disciplineId !== undefined) {
      formData.set('disciplineId', disciplineId.toString());
    } else {
      formData.delete('disciplineId');
    }

    const result = await updateMatch(match.id, formData);
    return result;
  };

  const [state, action, pending] = useActionState(actionHandler, {
    errors: undefined,
    message: undefined,
  });

  const selectedTournament = tournaments.find(
    (t) => t.id.toString() === tournamentId
  );

  const minDate = selectedTournament
    ? new Date(selectedTournament.startDate).toISOString().slice(0, 16)
    : undefined;
  const maxDate = selectedTournament
    ? new Date(selectedTournament.endDate).toISOString().slice(0, 16)
    : undefined;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Редагування матчу</CardTitle>
          <CardDescription>Форма редагування матчу</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="opponent">Суперник</Label>
                <Input
                  id="opponent"
                  name="opponent"
                  placeholder="Назва суперника"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                />
                {state?.errors?.opponent && (
                  <p className="text-sm text-red-500">{state.errors.opponent[0]}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Дата і час</Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={minDate}
                  max={maxDate}
                />
                {state?.errors?.date && (
                  <p className="text-sm text-red-500">{state.errors.date[0]}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Статус</Label>
                <Select
                  name="status"
                  value={status}
                  onValueChange={(value) => setStatus(value as 'live' | 'finished' | 'upcoming')}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Вибрати статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Майбутній</SelectItem>
                    <SelectItem value="live">Пряма трансляція</SelectItem>
                    <SelectItem value="finished">Завершений</SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.status && (
                  <p className="text-sm text-red-500">{state.errors.status[0]}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="result">Результат</Label>
                <Input
                  id="result"
                  name="result"
                  placeholder="Результат матчу"
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  disabled={status === 'upcoming'}
                />
                {state?.errors?.result && (
                  <p className="text-sm text-red-500">{state.errors.result[0]}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tournamentId">Турнір</Label>
                <Select
                  name="tournamentId"
                  value={tournamentId}
                  onValueChange={(value) => setTournamentId(value)}
                >
                  <SelectTrigger id="tournamentId">
                    <SelectValue placeholder="Вибрати турнір" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Без турніру</SelectItem>
                    {tournaments.map((t) => (
                      <SelectItem key={t.id} value={t.id.toString()}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.tournamentId && (
                  <p className="text-sm text-red-500">{state.errors.tournamentId[0]}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="disciplineId">Дисципліна</Label>
                <Select
                  name="disciplineId"
                  value={disciplineId}
                  onValueChange={(value) => setDisciplineId(value)}
                >
                  <SelectTrigger id="disciplineId">
                    <SelectValue placeholder="Вибрати дисципліну" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Без дисципліни</SelectItem>
                    {disciplines.map((d) => (
                      <SelectItem key={d.id} value={d.id.toString()}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.disciplineId && (
                  <p className="text-sm text-red-500">{state.errors.disciplineId[0]}</p>
                )}
              </div>

              {state?.message && (
                <p className="text-sm text-green-600 mt-2">{state.message}</p>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-2">
              <Link href="/matches">
                <Button>До матчів</Button>
              </Link>

              <Button type="submit" disabled={pending}>
                {pending ? 'Оновлення...' : 'Оновити'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}