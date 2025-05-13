import Link from "next/link";
import NavLink from "./nav-link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { logout } from '@/app/actions/auth';
import logoImg from '@/public/mugetsu-white.png';
import logoHoverImg from '@/public/mugetsu-hover.png';

export default async function Header() {
    const session = await getSession();
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-black text-white p-4 shadow-md">
            <nav className="flex justify-between items-center">
                <Link href="/" className="relative w-40 h-15 group">
                    <Image
                        src={logoImg}
                        alt="Логотип"
                        fill
                        className="object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    />
                    <Image
                        src={logoHoverImg}
                        alt="Логотип при наведенні"
                        fill
                        className="object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                </Link>
                <div className="flex gap-5 items-center">
                    <NavLink href="/news">Новини</NavLink>
                    <NavLink href="/tournaments">Турніри</NavLink>
                    <NavLink href="/matches">Матчі</NavLink>
                    {session ? (
                        <>
                            <NavLink href="/profile">Профіль</NavLink>
                            <form action={logout}>
                                <Button>Вихід</Button>
                            </form>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button variant="secondary">Увійти</Button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};
