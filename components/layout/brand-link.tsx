import Link from "next/link";

import { focusRing } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/** Mono wordmark with the orange dot; the dot is decoration, so its 3:1 contrast in light mode is fine. */
export function BrandLink() {
  return (
    <Link href="/" className={cn("font-mono text-lg font-semibold tracking-tight", focusRing)}>
      beresin<span className="text-accent">.</span>
    </Link>
  );
}
