'use client';

import { useActionState, useRef, useState } from 'react';
import { addMatch } from '@/app/actions/matches';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MatchFormState } from '@/lib/definitions';

type FormMatch = {
  tournaments: { id: number; name: string; startDate: string; endDate: string }[];
  disciplines: { id: number; name: string }[];
};

export default function MatchAddModal({ tournaments, disciplines }: FormMatch) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('upcoming');

  const actionHandler = async (
    _prevState: MatchFormState,
    formData: FormData
  ): Promise<MatchFormState> => {
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

    const result = await addMatch(formData);

    if (result.message && !result.errors) {
      formRef.current?.reset();
      setSelectedTournamentId(null);
      setSelectedStatus('upcoming'); 
    }

    return result;
  };

  const [state, action, pending] = useActionState<MatchFormState, FormData>(
    actionHandler,
    { errors: undefined, message: undefined }
  );

  const selectedTournament = tournaments.find(
    (t) => t.id.toString() === selectedTournamentId
  );

  const minDate = selectedTournament
    ? new Date(selectedTournament.startDate).toISOString().slice(0, 16)
    : undefined;
  const maxDate = selectedTournament
    ? new Date(selectedTournament.endDate).toISOString().slice(0, 16)
    : undefined;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Додати матч</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Додати матч</DialogTitle>
          <DialogDescription>Додати новий матч.</DialogDescription>
        </DialogHeader>

        <form action={action} ref={formRef}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opponent" className="text-right">
                Суперник
              </Label>
              <Input id="opponent" name="opponent" className="col-span-3" />
              {state?.errors?.opponent && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.opponent[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Дата і час
              </Label>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                className="col-span-3"
                min={minDate}
                max={maxDate}
              />
              {state?.errors?.date && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.date[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Статус
              </Label>
              <Select
                name="status"
                defaultValue="upcoming"
                onValueChange={(value) => setSelectedStatus(value)}
              >
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Вибрати статус" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="upcoming">Майбутній</SelectItem>
                  <SelectItem value="live">Пряма трансляція</SelectItem>
                  <SelectItem value="finished">Завершений</SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.status && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.status[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="result" className="text-right">
                Результат
              </Label>
              <Input
                id="result"
                name="result"
                className="col-span-3"
                disabled={selectedStatus === 'upcoming'}
              />
              {state?.errors?.result && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.result[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tournamentId" className="text-right">
                Турнір
              </Label>
              <Select
                name="tournamentId"
                defaultValue="none"
                onValueChange={(value) => setSelectedTournamentId(value)}
              >
                <SelectTrigger id="tournamentId" className="col-span-3">
                  <SelectValue placeholder="Вибрати турнір" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="none">Без турніру</SelectItem>
                  {tournaments.map((t) => (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.tournamentId && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.tournamentId[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="disciplineId" className="text-right">
                Дисципліна
              </Label>
              <Select name="disciplineId" defaultValue="none">
                <SelectTrigger id="disciplineId" className="col-span-3">
                  <SelectValue placeholder="Вибрати дисципліну" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="none">Без дисципліни</SelectItem>
                  {disciplines.map((d) => (
                    <SelectItem key={d.id} value={d.id.toString()}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.disciplineId && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.disciplineId[0]}
                </p>
              )}
            </div>
            {state?.message && (
              <p className="text-sm text-green-600">{state.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? 'Завантаження...' : 'Додати'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}