'use client';

import { useActionState, useState } from 'react';
import { updateTeam } from '@/app/actions/teams';
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
import { Team, TeamFormState } from '@/lib/definitions';
import Link from 'next/link';

type FormTeam = {
  disciplines: { id: number; name: string }[];
  onDelete: (formData: FormData) => void;
};

export default function EditTeamModal({
  team,
  disciplines,
  onDelete,
}: { team: Team } & FormTeam) {
  const [name, setName] = useState(team.name);
  const [tag, setTag] = useState(team.tag);
  const [disciplineId, setDisciplineId] = useState<string>(
    team.discipline?.id ? team.discipline.id.toString() : 'none'
  );

  const actionHandler = async (_prevState: TeamFormState, formData: FormData) => {
    formData.set('id', team.id.toString());

    const disciplineIdRaw = formData.get('disciplineId');
    const disciplineIdValue =
      disciplineIdRaw && disciplineIdRaw !== 'none'
        ? Number(disciplineIdRaw)
        : undefined;

    if (disciplineIdValue !== undefined) {
      formData.set('disciplineId', disciplineIdValue.toString());
    } else {
      formData.delete('disciplineId');
    }

    return await updateTeam(team.id, formData);
  };

  const [state, action, pending] = useActionState(actionHandler, {
    errors: undefined,
    message: undefined,
  });

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Редагування команди</CardTitle>
          <CardDescription>Форма редагування даних команди</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Назва команди</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Назва"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {state?.errors?.name && (
                  <p className="text-sm text-red-500">{state.errors.name[0]}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tag">Тег</Label>
                <Input
                  id="tag"
                  name="tag"
                  placeholder="Тег команди"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
                {state?.errors?.tag && (
                  <p className="text-sm text-red-500">{state.errors.tag[0]}</p>
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
              <Link href="/teams">
                <Button>До команд</Button>
              </Link>
              <Button type="submit" disabled={pending}>
                {pending ? 'Оновлення...' : 'Оновити'}
              </Button>
            </div>
          </form>

          <form action={onDelete} className="flex justify-center mt-2">
            <Button variant="destructive" type="submit">
              Видалити
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}