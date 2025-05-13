import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SignupForm from '@/components/signup-form';

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect("/");
  return <SignupForm />;
}
