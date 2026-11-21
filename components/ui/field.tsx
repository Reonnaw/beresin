import type { ReactNode } from "react";

import { focusRing } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/** Base look for input, select and textarea. */
export const inputStyles = cn(
  "w-full rounded-[4px] border border-border bg-surface px-3 py-2 text-sm placeholder:text-muted aria-invalid:border-danger",
  focusRing,
);

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

/** Label, control and message. The control must use `id` and `aria-describedby={`${id}-message`}`. */
export function Field({ id, label, hint, error, children }: FieldProps) {
  const message = error ?? hint;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {message && (
        <p id={`${id}-message`} className={cn("text-xs", error ? "text-danger" : "text-muted")}>
          {message}
        </p>
      )}
    </div>
  );
}
