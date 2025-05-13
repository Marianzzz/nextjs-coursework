import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

import LoginForm from '@/components/login-form';

export default async function LoginPage() {
   const session = await getSession();
  if (session) redirect("/");
  return <LoginForm />;
}
