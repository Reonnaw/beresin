import { focusRing } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/** A link inside running text: always underlined so it reads as a link without color. */
export const inlineLinkStyles = cn(
  "font-semibold text-foreground underline underline-offset-4 hover:text-accent-secondary",
  focusRing,
);

/** A standalone action such as a card footer or "back to" link: the underline appears on hover. */
export const actionLinkStyles = cn(
  "text-sm font-semibold text-foreground underline-offset-4 hover:underline",
  focusRing,
);
