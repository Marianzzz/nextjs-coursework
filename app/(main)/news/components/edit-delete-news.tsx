'use client';

import { useActionState, useRef } from 'react';
import { updateNews} from '@/app/actions/news';
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
import { NewsFormState, News, Discipline } from '@/lib/definitions';
import { toast } from 'react-toastify';

export default function EditNewsModal({
    news,
    disciplines,
}: {
    news: News;
    disciplines: Discipline[];
}) {
    const formRef = useRef<HTMLFormElement>(null);

    const updateActionHandler = async (
        _prevState: NewsFormState,
        formData: FormData
    ): Promise<NewsFormState> => {
        const disciplineIdRaw = formData.get('disciplineId');
        const disciplineId =
            disciplineIdRaw && disciplineIdRaw !== 'none'
                ? Number(disciplineIdRaw)
                : undefined;

        if (disciplineId !== undefined) {
            formData.set('disciplineId', disciplineId.toString());
        } else {
            formData.delete('disciplineId');
        }

        const result = await updateNews(news.id, formData);

        if (result.message && !result.errors) {
            toast.success(result.message);
            formRef.current?.reset();
        } else if (result.message) {
            toast.error(result.message);
        }

        return result;
    };

    const [state, updateAction, pending] = useActionState<NewsFormState, FormData>(
        updateActionHandler,
        { errors: undefined, message: undefined }
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Редагувати новину</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Редагувати новину</DialogTitle>
                    <DialogDescription>Оновіть деталі новини.</DialogDescription>
                </DialogHeader>

                <form action={updateAction} ref={formRef}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Заголовок
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={news.title}
                                className="col-span-3"
                            />
                            {state?.errors?.title && (
                                <p className="col-span-4 text-sm text-red-500">
                                    {state.errors.title[0]}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="content" className="text-right">
                                Вміст
                            </Label>
                            <Input
                                id="content"
                                name="content"
                                defaultValue={news.content}
                                className="col-span-3"
                            />
                            {state?.errors?.content && (
                                <p className="col-span-4 text-sm text-red-500">
                                    {state.errors.content[0]}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="disciplineId" className="text-right">
                                Дисципліна
                            </Label>
                            <Select
                                name="disciplineId"
                                defaultValue={news.disciplineId?.toString() ?? 'none'}
                            >
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Зображення
                            </Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="col-span-3"
                            />
                            {state?.errors?.image && (
                                <p className="col-span-4 text-sm text-red-500">
                                    {state.errors.image[0]}
                                </p>
                            )}
                        </div>
                        {state?.message && (
                            <p className="text-sm text-green-600">{state.message}</p>
                        )}
                    </div>

                    <DialogFooter className="flex justify-between">
                        <Button type="submit" disabled={pending}>
                            {pending ? 'Оновлення...' : 'Оновити'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}