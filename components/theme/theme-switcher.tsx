"use client";

import { type ReactNode, useId } from "react";

import type { ThemePreference } from "@/components/theme/theme-config";
import { setThemePreference, useThemePreference } from "@/components/theme/theme-store";
import { cn } from "@/lib/cn";

const ICON_PROPS = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const OPTIONS = [
  {
    value: "light",
    label: "Terang",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Gelap",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    ),
  },
  {
    value: "system",
    label: "Ikuti sistem",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
] as const satisfies readonly { value: ThemePreference; label: string; icon: ReactNode }[];

/** Light, dark or system, as a native radio group so arrow keys and screen readers work for free. */
export function ThemeSwitcher({ className }: { className?: string }) {
  const preference = useThemePreference();
  // Unique per instance: header and footer both render a switcher, and a shared name would merge their groups.
  const name = useId();

  return (
    <fieldset className={cn("inline-flex shrink-0 gap-0.5 rounded-sm border border-border bg-surface p-0.5", className)}>
      <legend className="sr-only">Tema tampilan</legend>
      {OPTIONS.map((option) => (
        <label
          key={option.value}
          title={option.label}
          className={cn(
            "grid size-7 cursor-pointer place-items-center rounded-xs text-muted transition-colors hover:text-foreground",
            "has-checked:bg-surface-muted has-checked:text-foreground",
            "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-accent",
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={preference === option.value}
            onChange={() => setThemePreference(option.value)}
            className="sr-only"
          />
          {option.icon}
          <span className="sr-only">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
