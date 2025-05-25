"use client";

import { login } from "@/app/actions/auth";
import { useActionState } from "react";
import { FormState } from "@/lib/definitions";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    login,
    { errors: undefined, message: undefined }
  );


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4 mt-16">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Вхід</CardTitle>
        </CardHeader>

        <form action={action}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Пошта</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Ваш пароль"
                required
              />
              {state?.errors?.password && (
                <div className="text-sm text-red-500">
                  <p>Пароль повинен:</p>
                  <ul className="list-disc pl-4">
                    {state.errors.password.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Завантаження..." : "Увійти"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn("github", { callbackUrl: "/profile" })}
            >
              Увійти через GitHub
            </Button>

            <p className="text-sm text-center">
              Немає акаунту?
              <Link href="/signup" className="underline">
                Зареєструйся
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}