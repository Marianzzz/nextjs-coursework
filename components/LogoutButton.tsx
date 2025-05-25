"use client";

import { signOut } from "next-auth/react";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await logout(); 
      await signOut({ callbackUrl: "/" }); 
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} className="w-full">
      {isPending ? "Вихід..." : "Вийти"}
    </Button>
  );
}
