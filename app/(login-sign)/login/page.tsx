import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Увійти',
  description: 'Форма для входу користувача',
}

import LoginForm from './components/login-form';

export default async function LoginPage() {
   const session = await getSession();
  if (session) redirect("/");
  return <LoginForm />;
}
