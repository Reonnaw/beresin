import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";

/** Page title block: mono eyebrow, h1 and a short description, with room for actions on the right. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
      <div className="flex flex-col gap-1.5">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="max-w-2xl text-sm text-muted">{description}</p>}
      </div>
      {children}
    </div>
  );
}
