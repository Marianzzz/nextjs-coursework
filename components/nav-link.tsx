'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();
  const isActive = path === href || path.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`transition-colors hover:text-white hover:underline hover:underline-offset-4 ${isActive ? 'text-white font-semibold underline underline-offset-4' : 'text-slate-400"'
        }`}
    >
      {children}
    </Link>
  );
}
