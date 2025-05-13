import { ReactNode } from "react";
import { logout } from '@/app/actions/auth';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

interface AuthRootLayoutProps {
  children: ReactNode; 
}

export default function AuthRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <>
      <header id="auth-header">
        <p>З поверненням!</p>
        <form action={logout}>
          <button>Вихід</button>
        </form>
      </header>
      {children}
    </>
  );
}