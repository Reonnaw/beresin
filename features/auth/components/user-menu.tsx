import Link from "next/link";

import { Button, buttonStyles } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions";
import { getCurrentUser } from "@/features/auth/services/auth-service";

/** Reads the session, so the header renders it behind Suspense. */
export async function UserMenu() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link href="/login" className={buttonStyles({ size: "sm" })}>
        Masuk
      </Link>
    );
  }

  return (
    <form action={signOut} className="flex items-center gap-2">
      <span className="hidden max-w-40 truncate text-sm text-muted sm:inline">
        {user.fullName ?? user.email}
      </span>
      <Button type="submit" variant="ghost" size="sm">
        Keluar
      </Button>
    </form>
  );
}
