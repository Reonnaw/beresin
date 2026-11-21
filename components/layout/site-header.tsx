import Link from "next/link";

import { MainNav } from "@/components/layout/main-nav";
import { focusRing } from "@/components/ui/button";
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
        <MainNav />
      </div>
    </header>
  );
}
