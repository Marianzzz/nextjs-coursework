"use client";

import { useActionState } from "react";
import { addMedia } from "@/app/actions/media";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MediaFormState, FormMedia, MediaSchema } from "@/lib/definitions";

export default function MediaAddModal({ disciplines }: FormMedia) {
    const actionHandler = async (
        _prevState: MediaFormState,
        formData: FormData
    ): Promise<MediaFormState> => {

        const title = formData.get("title");
        const videoUrl = formData.get("videoUrl");
        const disciplineIdRaw = formData.get("disciplineId");

        const disciplineId =
            disciplineIdRaw && disciplineIdRaw !== "none"
                ? Number(disciplineIdRaw)
                : undefined;

        const payload = {
            title: typeof title === "string" ? title.trim() : "",
            videoUrl: typeof videoUrl === "string" ? videoUrl.trim() : "",
            disciplineId,
        };

        const validation = MediaSchema.safeParse(payload);

        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return { errors, message: undefined };
        }

        const result = await addMedia(formData);

        return result;
    };

    const [state, action, pending] = useActionState<
        MediaFormState,
        FormData
    >(actionHandler, { errors: undefined, message: undefined });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Додати медіа</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Додати медіа</DialogTitle>
                    <DialogDescription>Додати новий медіа блок.</DialogDescription>
                </DialogHeader>

                <form action={action}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Заголовок
                            </Label>
                            <Input id="title" name="title" className="col-span-3" />
                            {state?.errors?.title && (
                                <p className="col-span-4 text-sm text-red-500">
                                    {state.errors.title[0]}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="videoUrl" className="text-right">
                                Відео посилання
                            </Label>
                            <Input id="videoUrl" name="videoUrl" className="col-span-3" />
                            {state?.errors?.videoUrl && (
                                <p className="col-span-4 text-sm text-red-500">
                                    {state.errors.videoUrl[0]}
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
                            {pending ? "Завантаження..." : "Додати"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
