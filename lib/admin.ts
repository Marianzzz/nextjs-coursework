import { getSession } from "@/lib/session";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;

  const user = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, session.userId))
    .then((res) => res[0]);

  return user?.role === "admin";
}
