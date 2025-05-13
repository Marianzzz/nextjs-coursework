import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

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
