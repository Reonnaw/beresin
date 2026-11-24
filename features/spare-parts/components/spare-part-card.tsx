import Link from "next/link";

import { focusRing } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { toCartProduct } from "@/features/cart/lib/cart";
import { StockBadge } from "@/features/spare-parts/components/stock-badge";
import { MODULE_LABELS } from "@/lib/constants/modules";
import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/format";
import type { SparePartWithModel } from "@/types/domain";

export function SparePartCard({ part }: { part: SparePartWithModel }) {
  return (
    <Card className="relative flex w-full flex-col gap-3 p-4 transition-colors hover:border-accent-secondary">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-muted">
          {MODULE_LABELS[part.module_type]}
        </span>
        <StockBadge stock={part.stock} />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h2 className="font-semibold leading-snug">
          {/* Stretched link: the whole card is clickable, one tab stop. */}
          <Link
            href={`/spare-parts/${encodeURIComponent(part.sku)}`}
            className={cn("after:absolute after:inset-0", focusRing)}
          >
            {part.name}
          </Link>
        </h2>
        <p className="font-mono text-xs text-muted">{part.sku}</p>
      </div>
      <p className="text-xs text-muted">
        Kompatibel: {part.laptop_models?.name ?? "Semua seri (universal)"}
      </p>
      <p className="border-t border-border pt-3 font-mono text-lg font-semibold tabular-nums">
        {formatRupiah(part.price)}
      </p>
      {/* z-10 lifts the button above the card's stretched link. */}
      <AddToCartButton product={toCartProduct(part)} className="relative z-10" />
    </Card>
  );
}
