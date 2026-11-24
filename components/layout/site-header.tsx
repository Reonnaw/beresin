import Link from "next/link";
import { Suspense } from "react";

import { MainNav, NavLinks } from "@/components/layout/main-nav";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { focusRing } from "@/components/ui/button";
import { UserMenu } from "@/features/auth/components/user-menu";
import { CartLink } from "@/features/cart/components/cart-link";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="flex h-14 w-full items-center gap-6 px-5">
        <Link
          href="/"
          className={cn("font-mono text-lg font-semibold tracking-tight", focusRing)}
        >
          beresin<span className="text-accent">.</span>
        </Link>
        <Suspense fallback={<NavLinks pathname={null} />}>
          <MainNav />
        </Suspense>
        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
          <CartLink />
          <Suspense fallback={<span className="h-8 w-16" aria-hidden />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
