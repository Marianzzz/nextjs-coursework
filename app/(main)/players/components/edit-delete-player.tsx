'use client';

import { useActionState, useState } from 'react';
import { updatePlayer } from '@/app/actions/players';
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
import { Player, PlayerFormState, FormPlayerProps } from '@/lib/definitions';
import Link from 'next/link';



export default function EditPlayerModal({
    player,
    teams,
    disciplines,
    onDelete,
}: { player: Player } & FormPlayerProps) {
    const [name, setName] = useState(player.name);
    const [tag, setTag] = useState(player.tag);
    const [teamId, setTeamId] = useState<string>(
        player.team?.id?.toString() ?? 'none'
    );
    const [disciplineId, setDisciplineId] = useState<string>(
        player.discipline?.id?.toString() ?? 'none'
    );

    const actionHandler = async (_prevState: PlayerFormState, formData: FormData) => {
        formData.set('id', player.id.toString());

        const teamIdRaw = formData.get('teamId');
        const teamIdValue =
            teamIdRaw && teamIdRaw !== 'none' ? Number(teamIdRaw) : undefined;

        if (teamIdValue !== undefined) {
            formData.set('teamId', teamIdValue.toString());
        } else {
            formData.delete('teamId');
        }

        const disciplineIdRaw = formData.get('disciplineId');
        const disciplineIdValue =
            disciplineIdRaw && disciplineIdRaw !== 'none' ? Number(disciplineIdRaw) : undefined;

        if (disciplineIdValue !== undefined) {
            formData.set('disciplineId', disciplineIdValue.toString());
        } else {
            formData.delete('disciplineId');
        }

        return await updatePlayer(player.id, formData);
    };

    const [state, action, pending] = useActionState(actionHandler, {
        errors: undefined,
        message: undefined,
    });

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Редагування гравця</CardTitle>
                    <CardDescription>Форма редагування даних гравця</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Ім’я гравця</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Ім’я"
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
                                    placeholder="Геймерський тег"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                                {state?.errors?.tag && (
                                    <p className="text-sm text-red-500">{state.errors.tag[0]}</p>
                                )}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="disciplineId">Команда</Label>
                                <Select
                                    name="teamId"
                                    value={teamId}
                                    onValueChange={(value) => {
                                        setTeamId(value);

                                        if (value === 'none') {
                                            setDisciplineId('none');
                                        } else {
                                            const selectedTeam = teams.find((t) => t.id.toString() === value);
                                            if (selectedTeam?.disciplineId) {
                                                setDisciplineId(selectedTeam.disciplineId.toString());
                                            }
                                        }
                                    }}
                                >
                                    <SelectTrigger id="teamId">
                                        <SelectValue placeholder="Оберіть команду">
                                            {(() => {
                                                const selectedTeam = teams.find((t) => t.id.toString() === teamId);
                                                return selectedTeam ? `${selectedTeam.name} [${selectedTeam.tag}]` : 'Без команди';
                                            })()}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Без команди</SelectItem>
                                        {teams.map((team) => (
                                            <SelectItem key={team.id} value={team.id.toString()}>
                                                {team.name}[{team.tag}]
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {state?.errors?.teamId && (
                                    <p className="text-sm text-red-500">{state.errors.teamId[0]}</p>
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
                                        <SelectValue placeholder="Оберіть дисципліну">
                                            {disciplines.find((d) => d.id.toString() === disciplineId)?.name || 'Без дисципліни'}
                                        </SelectValue>
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
