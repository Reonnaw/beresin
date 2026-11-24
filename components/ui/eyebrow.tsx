import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const tones = {
  accent: "text-accent-secondary",
  muted: "text-muted",
  success: "text-success",
  danger: "text-danger",
} as const;

/** Mono, tracked-out label above a heading: the technical tag every page and section opens with. */
export function Eyebrow({ tone = "accent", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <p className={cn("font-mono text-xs tracking-[0.2em] uppercase", tones[tone])}>{children}</p>;
}
