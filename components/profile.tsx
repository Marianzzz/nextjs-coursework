'use client';

import { useActionState } from 'react';
import { changeEmail, changePassword } from '@/app/actions/account';
import { AccountState } from '@/lib/definitions';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

export default function Profile({ userEmail }: { userEmail: string }) {
    const emailHandler = async (_prevState: AccountState, formData: FormData) => {
        return await changeEmail(formData);
    };

    const passwordHandler = async (_prevState: AccountState, formData: FormData) => {
        return await changePassword(formData);
    };

    const [emailState, emailAction, emailPending] = useActionState<AccountState, FormData>(
        emailHandler,
        { errors: undefined, message: undefined }
    );

    const [passwordState, passwordAction, passwordPending] = useActionState<AccountState, FormData>(
        passwordHandler,
        { errors: undefined, message: undefined }
    );

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Акаунт</TabsTrigger>
                    <TabsTrigger value="password">Пароль</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Акаунт</CardTitle>
                            <CardDescription>Зміни пошту та натисни зберегти.</CardDescription>
                        </CardHeader>
                        <form action={emailAction}>
                            <CardContent className="space-y-2 mb-4">
                                <div className="space-y-1">
                                    <Label htmlFor="email">Пошта</Label>
                                    <Input id="email" name="email" type="email" defaultValue={userEmail} />
                                    {emailState?.errors?.email && (
                                        <p className="text-sm text-red-500">{emailState.errors.email[0]}</p>
                                    )}
                                </div>
                                {emailState?.message && (
                                    <p className="text-sm text-green-600">{emailState.message}</p>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={emailPending}>
                                    {emailPending ? 'Збереження...' : 'Зберегти зміни'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Пароль</CardTitle>
                            <CardDescription>Зміни пароль тут.</CardDescription>
                        </CardHeader>
                        <form action={passwordAction}>
                            <CardContent className="space-y-2 mb-4">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Поточний пароль</Label>
                                    <Input id="current" name="current" type="password"/>
                                    {passwordState?.errors?.current && (
                                        <p className="text-sm text-red-500">{passwordState.errors.current[0]}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Новий пароль</Label>
                                    <Input id="new" name="new" type="password" />
                                    {passwordState?.errors?.new && (
                                        <p className="text-sm text-red-500">{passwordState.errors.new[0]}</p>
                                    )}
                                </div>
                                {passwordState?.message && (
                                    <p className="text-sm text-green-600">{passwordState.message}</p>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={passwordPending}>
                                    {passwordPending ? 'Оновлення...' : 'Зберегти пароль'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}