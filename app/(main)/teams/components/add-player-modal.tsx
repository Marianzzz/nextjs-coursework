'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { addPlayer } from '@/app/actions/players';
import { PlayerFormState, PlayerSchema, PlayersProps } from '@/lib/definitions';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PlayersAddModal({ disciplines, teams }: PlayersProps) {
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | undefined>('none');

  const teamDisciplineMap = new Map(
    teams.map(team => [team.id, team.discipline?.id?.toString() || 'none'])
  );

  const handleTeamChange = (teamId: string) => {
    const disciplineId = teamDisciplineMap.get(Number(teamId)) ?? 'none';
    setSelectedDisciplineId(disciplineId);
  };

  const actionHandler = async (_prevState: PlayerFormState, formData: FormData): Promise<PlayerFormState> => {
    const name = formData.get("name");
    const tag = formData.get("tag");
    const teamId = formData.get("teamId");
    const disciplineId = selectedDisciplineId !== 'none' ? Number(selectedDisciplineId) : undefined;

    const payload = {
      name: typeof name === 'string' ? name.trim() : '',
      tag: typeof tag === 'string' ? tag.trim() : '',
      teamId: teamId ? Number(teamId) : undefined,
      disciplineId,
    };

    const validation = PlayerSchema.safeParse(payload);

    if (!validation.success) {
      return {
        errors: validation.error.flatten().fieldErrors,
      };
    }

    formData.set('disciplineId', selectedDisciplineId || 'none');

    return await addPlayer(formData);
  };

  const [state, formAction, pending] = useActionState<PlayerFormState, FormData>(
    actionHandler,
    { errors: undefined, message: undefined }
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Додати гравця</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Додати гравця</DialogTitle>
          <DialogDescription>Заповніть форму, щоб додати гравця.</DialogDescription>
        </DialogHeader>

        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Ім’я</Label>
              <Input id="name" name="name" className="col-span-3" />
              {state?.errors?.name && <p className="col-span-4 text-sm text-red-500">{state.errors.name[0]}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag" className="text-right">Тег</Label>
              <Input id="tag" name="tag" className="col-span-3" />
              {state?.errors?.tag && <p className="col-span-4 text-sm text-red-500">{state.errors.tag[0]}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teamId" className="text-right">Команда</Label>
              <Select name="teamId" onValueChange={handleTeamChange}>
                <SelectTrigger id="teamId">
                  <SelectValue placeholder="Вибрати команду" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name}[{team.tag}] - {team.discipline?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.teamId && <p className="col-span-4 text-sm text-red-500">{state.errors.teamId[0]}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="disciplineId" className="text-right">Дисципліна</Label>
              <Select name="disciplineId" value={selectedDisciplineId} onValueChange={setSelectedDisciplineId}>
                <SelectTrigger id="disciplineId">
                  <SelectValue placeholder="Вибрати" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Без дисципліни</SelectItem>
                  {disciplines.map(d => (
                    <SelectItem key={d.id} value={d.id.toString()}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.disciplineId && <p className="col-span-4 text-sm text-red-500">{state.errors.disciplineId[0]}</p>}
            </div>
            {state?.message && <p className="text-sm text-green-600">{state.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Завантаження..." : "Додати"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
