import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  // Orange fill keeps charcoal text: white on orange fails contrast.
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  secondary: "border border-border bg-surface text-foreground hover:bg-surface-muted",
  ghost: "text-foreground hover:bg-surface-muted",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Shared by <Button> and links that must look like buttons. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
    focusRing,
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
