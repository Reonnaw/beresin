import { Suspense } from "react";

import { BrandLink } from "@/components/layout/brand-link";
import { MainNav, NavLinks } from "@/components/layout/main-nav";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { UserMenu } from "@/features/auth/components/user-menu";
import { CartLink } from "@/features/cart/components/cart-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="flex h-14 w-full items-center gap-6 px-5">
        <BrandLink />
        <Suspense fallback={<NavLinks pathname={null} />}>
          <MainNav />
        </Suspense>
        <div className="ml-auto flex items-center gap-2">
          {/* Phones need the row for nav and cart; the footer carries the switcher there. */}
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <CartLink />
          <Suspense fallback={<span className="h-8 w-16" aria-hidden />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
