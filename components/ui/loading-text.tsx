import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Mono status line shown while a section streams in; announced politely to screen readers. */
export function LoadingText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p role="status" className={cn("font-mono text-sm text-muted", className)}>
      {children}
    </p>
  );
}
