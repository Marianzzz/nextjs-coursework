"use client";

import { useState } from "react";
import { useActionState } from "react";
import { updateMedia } from "@/app/actions/media";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { MediaEditProps, MediaFormState } from "@/lib/definitions";
import Link from "next/link";



export default function MediaEdit({ media, disciplines, onDelete }: MediaEditProps) {
  const [title, setTitle] = useState(media.title);
  const [videoUrl, setVideoUrl] = useState(media.videoUrl);
  const [disciplineId, setDisciplineId] = useState<string>(
    media.disciplineId ? media.disciplineId.toString() : "none"
  );

  const actionHandler = async (
    _prevState: MediaFormState,
    formData: FormData
  ) => {
    formData.set("id", media.id.toString());
    const result = await updateMedia(media.id, formData);
    return result;
  };

  const [state, action, pending] = useActionState(actionHandler, {
    errors: undefined,
    message: undefined,
  });

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Редагування</CardTitle>
          <CardDescription>Форма редагування відео</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Назва</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Назва відео"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {state?.errors?.title && (
                  <p className="text-sm text-red-500">{state.errors.title[0]}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="videoUrl">Посилання на відео</Label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  placeholder="Посилання на відео"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                {state?.errors?.videoUrl && (
                  <p className="text-sm text-red-500">{state.errors.videoUrl[0]}</p>
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
                    <SelectValue placeholder="Оберіть" />
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
              <Link href="/media">
                <Button>До медіа</Button>
              </Link>

              <Button type="submit" disabled={pending}>
                {pending ? "Оновлення..." : "Оновити"}
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
