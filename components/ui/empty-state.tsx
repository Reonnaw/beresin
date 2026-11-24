import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Dashed placeholder for "nothing here yet", with an optional next step underneath the message. */
export function EmptyState({
  children,
  action,
  className,
}: {
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start gap-3 rounded-sm border border-dashed border-border p-8", className)}>
      <p className="text-sm text-muted">{children}</p>
      {action}
    </div>
  );
}
