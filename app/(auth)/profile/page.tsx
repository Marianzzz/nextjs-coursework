import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Профіль',
  description: 'Профіль користувача',
}

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/");

  const { userId } = session as { userId: string };

  return (
    <div>
      <h1>Вітаю, користувач #{userId}</h1>
    </div>
  );
}
