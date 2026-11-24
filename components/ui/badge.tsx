import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const tones = {
  neutral: "border-border bg-surface-muted text-muted",
  success: "border-success/30 bg-success/10 text-success",
  danger: "border-danger/30 bg-danger/10 text-danger",
  accent: "border-accent bg-accent text-accent-foreground",
} as const;

export type BadgeTone = keyof typeof tones;

export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-2xs font-medium uppercase tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
