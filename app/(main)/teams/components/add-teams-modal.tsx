'use client';

import { useActionState} from 'react';
import { addTeam } from '@/app/actions/teams';
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
import { TeamFormState, TeamSchema, FormTeam } from '@/lib/definitions';

export default function TeamsAddModal({ disciplines }: FormTeam) {
  const actionHandler = async (
    _prevState: TeamFormState,
    formData: FormData
  ): Promise<TeamFormState> => {
    const name = formData.get('name');
    const tag = formData.get('tag');
    const disciplineId = formData.get('disciplineId');

    const payload = {
      name: typeof name === 'string' ? name.trim() : '',
      tag: typeof tag === 'string' ? tag.trim() : '',
      disciplineId: disciplineId !== 'none' ? Number(disciplineId) : undefined,
    };

    const validation = TeamSchema.safeParse(payload);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return { errors, message: undefined };
    }

    const result = await addTeam(formData);
    return result;
  };

  const [state, action, pending] = useActionState<
    TeamFormState,
    FormData
  >(actionHandler, { errors: undefined, message: undefined });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Додати команду</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Додати команду</DialogTitle>
          <DialogDescription>Заповніть форму для нової команди.</DialogDescription>
        </DialogHeader>

        <form action={action}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
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
              <Label htmlFor="tag" className="text-right">
                Тег
              </Label>
              <Input id="tag" name="tag" className="col-span-3" />
              {state?.errors?.tag && (
                <p className="col-span-4 text-sm text-red-500">
                  {state.errors.tag[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="disciplineId" className="text-right">
                Дисципліна
              </Label>
              <Select name="disciplineId" defaultValue="none">
                <SelectTrigger id="disciplineId">
                  <SelectValue placeholder="Вибрати" />
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
