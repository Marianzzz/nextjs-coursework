import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SignupForm from './components/signup-form';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Зареєструватись',
  description: 'Форма для входу користувача',
}


export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect("/");
  return <SignupForm />;
}
