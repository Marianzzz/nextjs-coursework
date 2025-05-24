"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 py-2 px-4 mt-4">
            <div className="mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="relative w-15 h-20 group">
                        <Image
                            src="/m-ugetsu.png"
                            alt="Mugetsu Logo"
                            fill
                            className="object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                        />
                        <Image
                            src="/m-ugetsu-hover.png"
                            alt="Mugetsu Hover Logo"
                            fill
                            className="object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        />
                    </Link>

                    <div className="text-sm leading-relaxed">
                        <p className="text-white">Mugetsu 2025 ©</p>
                        <p>Заборонено для дітей. 18+</p>
                    </div>
                </div>
                <div className="text-sm text-center lg:text-left leading-relaxed">
                    <p>
                        Усі авторські права та торгові марки належать відповідним власникам. Контакт:{" "}
                        <a href="mailto:admin@mugetsu.gg" className="underline">admin@mugetsu.gg</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
