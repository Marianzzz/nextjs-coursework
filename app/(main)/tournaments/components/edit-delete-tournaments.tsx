'use client';

import { useActionState, useRef } from 'react';
import { updateTournament } from '@/app/actions/tournaments';
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
import { TournamentFormState, Tournament } from '@/lib/definitions';

export default function EditTournamentModal({ tournament }: { tournament: Tournament }) {
  const formRef = useRef<HTMLFormElement>(null);

  const updateActionHandler = async (
    _prevState: TournamentFormState,
    formData: FormData
  ): Promise<TournamentFormState> => {
    const result = await updateTournament(tournament.id, formData);

    if (result.message && !result.errors) {
      formRef.current?.reset();
    }

    return result;
  };

  const [state, updateAction, pending] = useActionState<TournamentFormState, FormData>(
    updateActionHandler,
    { errors: undefined, message: undefined }
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Редагувати турнір</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Редагувати турнір</DialogTitle>
          <DialogDescription>Оновіть деталі турніру.</DialogDescription>
        </DialogHeader>

        <form action={updateAction} ref={formRef}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">Назва</Label>
              <Input
                id="name"
                name="name"
                defaultValue={tournament.name}
                className="col-span-3"
              />
              {state?.errors?.name && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-left">Початок</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={tournament.startDate}
                className="col-span-3"
              />
              {state?.errors?.startDate && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.startDate[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-left">Завершення</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={tournament.endDate}
                className="col-span-3"
              />
              {state?.errors?.endDate && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.endDate[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prizePool" className="text-left">Призовий фонд</Label>
              <Input
                id="prizePool"
                name="prizePool"
                type="text"
                defaultValue={tournament.prizePool ?? ''}
                className="col-span-3"
              />
              {state?.errors?.prizePool && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.prizePool[0]}
                </p>
              )}
            </div>

            {state?.message && (
              <p className="text-sm text-green-600">{state.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? 'Оновлення...' : 'Оновити'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
