'use client';

import { useActionState } from 'react';
import { addTournament } from '@/app/actions/tournaments';
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
import { TournamentFormState, TournamentSchema } from '@/lib/definitions';

export default function AddTournamentModal() {
  const actionHandler = async (
    _prevState: TournamentFormState,
    formData: FormData
  ): Promise<TournamentFormState> => {
    const name = formData.get('name');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const prizePool = formData.get('prizePool');

    const payload = {
      name: typeof name === 'string' ? name.trim() : '',
      startDate: typeof startDate === 'string' ? startDate.trim() : '',
      endDate: typeof endDate === 'string' ? endDate.trim() : '',
      prizePool: typeof prizePool === 'string' ? prizePool.trim() : '',
    };

    const validation = TournamentSchema.safeParse(payload);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return { errors, message: undefined };
    }

    const result = await addTournament(formData);
    return result;
  };

  const [state, action, pending] = useActionState<
    TournamentFormState,
    FormData
  >(actionHandler, { errors: undefined, message: undefined });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Додати турнір</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Додати турнір</DialogTitle>
          <DialogDescription>Додати новий турнір.</DialogDescription>
        </DialogHeader>

        <form action={action}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">
                Назва
              </Label>
              <Input id="name" name="name" className="col-span-3" />
              {state?.errors?.name && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.name[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-left">
                Дата початку
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                className="col-span-3"
              />
              {state?.errors?.startDate && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.startDate[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-left">
                Дата закінчення
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                className="col-span-3"
              />
              {state?.errors?.endDate && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.endDate[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prizePool" className="text-left">
                Призовий фонд
              </Label>
              <Input id="prizePool" name="prizePool" className="col-span-3" />
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
              {pending ? 'Завантаження...' : 'Додати'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}