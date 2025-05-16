import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from 'next'
import Profile from "@/components/profile";


export const metadata: Metadata = {
  title: 'Профіль',
  description: 'Профіль користувача',
}

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/");
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .then((res) => res[0]);

  return (
    <Profile userEmail={user?.email ?? ""} userRole={user?.role ?? 'user'} />
  )
}
