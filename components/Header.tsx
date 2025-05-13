import { getSession } from "@/lib/session";
import { logout } from '@/app/actions/auth';
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default async function Header() {
    const session = await getSession();
    return (
        <header className="bg-black text-white p-4">
            <nav className="flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">Mugetsu</Link>
                <div className="flex gap-5 items-center">
                    <Link href="/news">Новини</Link>
                    <Link href="/tournaments">Турніри</Link>
                    <Link href="/matches">Матчі</Link>
                    {session ? (
                        <>
                            <Link href="/profile">Профіль</Link>
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
