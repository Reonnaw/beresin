"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { focusRing } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/", label: "Workbench" },
  { href: "/spare-parts", label: "Spare Part" },
] as const;

/** Pathname is request data, so the header renders <NavLinks pathname={null} /> until it resolves. */
export function MainNav() {
  return <NavLinks pathname={usePathname()} />;
}

export function NavLinks({ pathname }: { pathname: string | null }) {
  return (
    <nav aria-label="Navigasi utama" className="flex items-center gap-1">
      {NAV_ITEMS.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : !!pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "border-b-2 px-3 py-4 text-sm font-medium",
              active ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground",
              focusRing,
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
