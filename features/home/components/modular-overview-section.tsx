import Link from "next/link";

import { focusRing } from "@/components/ui/button";
import { motionStep } from "@/components/ui/motion";
import { actionLinkStyles } from "@/components/ui/text-link";
import { SectionHeading } from "@/features/home/components/section-heading";
import { HOME_MODULES } from "@/features/home/data/home-content";
import { cn } from "@/lib/cn";
import { MODULE_TYPES } from "@/lib/constants/modules";

/** Every swappable module with its spec, typical failure and where to go next. */
export function ModularOverviewSection() {
  return (
    <section aria-labelledby="modules-title" className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-20">
      <SectionHeading id="modules-title" title="Tiap bagian bisa dilepas, dicek, dan diganti satu per satu." />
      <ul className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {MODULE_TYPES.map((type, index) => {
          const part = HOME_MODULES[type];
          return (
            <li key={type} className="flex bg-surface">
              {/* The cell stays put and its content rises: a faded cell would show the border-colored grid behind it. */}
              <div className="reveal flex w-full flex-col gap-3 p-5" style={motionStep(index % 4)}>
                <p className="flex justify-between gap-3 font-mono text-xs text-muted">
                  <span className="text-accent-secondary">{part.skuPrefix}</span>
                  <span>M{String(index + 1).padStart(2, "0")}</span>
                </p>
                <h3 className="text-lg font-bold tracking-tight">{part.name}</h3>
                <p className="font-mono text-xs">{part.spec}</p>
                <p className="text-sm text-muted">{part.failure}</p>
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2">
                  <Link href={`/spare-parts?module=${type}`} className={actionLinkStyles}>
                    Spare part
                  </Link>
                  <Link
                    href={`/workbench?module=${type}`}
                    className={cn(
                      "text-sm font-semibold text-muted underline-offset-4 hover:text-foreground hover:underline",
                      focusRing,
                    )}
                  >
                    Cek di 3D
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
