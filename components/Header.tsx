import Link from "next/link";
import NavLink from "./nav-link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { logout } from '@/app/actions/auth';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    DivDescription,
    SheetTrigger,
} from "@/components/ui/sheet"


export default async function Header() {
    const session = await getSession();
    return (
        <header className="w-full bg-black text-white shadow-md p-4">
            <div className="flex justify-between items-center">
                <Link href="/" className="relative w-40 h-15 group">
                    <Image
                        src='/mugetsu-white.png'
                        alt="Логотип"
                        fill
                        className="object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    />
                    <Image
                        src='/mugetsu-hover.png'
                        alt="Логотип при наведенні"
                        fill
                        className="object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="flex flex-col">
                        <SheetHeader>
                            <SheetTitle>Меню</SheetTitle>
                        </SheetHeader>
                        <DivDescription>
                            <nav className="flex flex-col flex-grow gap-5 px-4">
                                <NavLink href="/news">Новини</NavLink>
                                <NavLink href="/tournaments">Турніри</NavLink>
                                <NavLink href="/matches">Матчі</NavLink>
                                <NavLink href="/teams">Команди</NavLink>
                                <NavLink href="/media">Медіа</NavLink>
                                {session ? (
                                    <>
                                        <NavLink href="/profile">Профіль</NavLink>
                                    </>
                                ) : null}
                            </nav>
                        </DivDescription>
                        <SheetFooter className="px-4">
                            {session ? (
                                <form action={logout}>
                                    <Button type="submit" className="w-full">Вихід</Button>
                                </form>
                            ) : (
                                <Link href="/login">
                                    <Button variant="secondary" className="w-full">Увійти</Button>
                                </Link>
                            )}
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};
