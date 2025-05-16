"use client";

import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import Link from "next/link";

export default function MediaEdit({ onDelete }: { onDelete: (formData: FormData) => void }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Редагування</CardTitle>
          <CardDescription>Форма редагування відео</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Назва</Label>
                <Input id="name" placeholder="Назва відео" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Гра</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Оберіть" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs2">CS2</SelectItem>
                    <SelectItem value="valorant">Valorant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href='/media'>
            <Button>
              Назад
            </Button>
          </Link>
          <form action={onDelete}>
            <Button variant="destructive" type="submit">
              Видалити
            </Button>
          </form>
          <Button>Оновити</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
