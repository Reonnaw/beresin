import Link from "next/link";

import { buttonStyles, focusRing } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { FloatingModule } from "@/features/home/components/three/hardware-parts";
import { HOME_MODULES } from "@/features/home/data/home-content";
import { cn } from "@/lib/cn";

/** Detail of the part clicked on the stage, with the two places it leads. */
export function PartDetailCard({ type, onClose }: { type: FloatingModule; onClose: () => void }) {
  const part = HOME_MODULES[type];

  return (
    <Card
      role="region"
      aria-labelledby="part-detail-title"
      className="flex flex-col gap-3 p-4 shadow-[0_0_0_1px_var(--signal)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs text-signal">{part.skuPrefix}</p>
          <h2 id="part-detail-title" className="font-display text-lg font-semibold">
            {part.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail part"
          className={cn("grid size-8 place-items-center rounded-[4px] text-muted hover:text-foreground", focusRing)}
        >
          <span aria-hidden>×</span>
        </button>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="font-mono text-xs leading-5 text-muted">SPEK</dt>
        <dd>{part.spec}</dd>
        <dt className="font-mono text-xs leading-5 text-muted">GEJALA</dt>
        <dd>{part.failure}</dd>
      </dl>
      <div className="flex flex-wrap gap-2">
        <Link href={`/workbench?module=${type}`} className={buttonStyles({ size: "sm" })}>
          Cek di workbench
        </Link>
        <Link href={`/spare-parts?module=${type}`} className={buttonStyles({ size: "sm", variant: "secondary" })}>
          Lihat spare part
        </Link>
      </div>
    </Card>
  );
}
