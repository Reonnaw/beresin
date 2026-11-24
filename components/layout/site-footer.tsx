import Link from "next/link";

import { BrandLink } from "@/components/layout/brand-link";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { focusRing } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

/** Site map and the theme switcher, which the header hides on small screens to keep its row usable. */
export function SiteFooter() {
  // mt-auto pins the footer to the bottom on pages shorter than the viewport.
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:grid-cols-[1fr_auto_auto] sm:items-start">
        <div className="flex flex-col gap-2">
          <BrandLink />
          <p className="max-w-xs text-sm text-muted">
            Diagnostik laptop modular dalam 3D, spare part kompatibel, dan servis yang bisa dilacak.
          </p>
        </div>
        <nav aria-label="Navigasi footer">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={cn("text-sm text-muted hover:text-foreground", focusRing)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col items-start gap-2">
          <Eyebrow tone="muted">Tema</Eyebrow>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
