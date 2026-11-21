import { Card } from "@/components/ui/card";
import { StockBadge } from "@/features/spare-parts/components/stock-badge";
import { MODULE_LABELS } from "@/lib/constants/modules";
import { formatRupiah } from "@/lib/format";
import type { SparePartWithModel } from "@/types/domain";

export function SparePartCard({ part }: { part: SparePartWithModel }) {
  return (
    <Card className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-muted">
          {MODULE_LABELS[part.module_type]}
        </span>
        <StockBadge stock={part.stock} />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h2 className="font-semibold leading-snug">{part.name}</h2>
        <p className="font-mono text-xs text-muted">{part.sku}</p>
      </div>
      <p className="text-xs text-muted">
        Kompatibel: {part.laptop_models?.name ?? "Semua seri (universal)"}
      </p>
      <p className="border-t border-border pt-3 font-mono text-lg font-semibold">
        {formatRupiah(part.price)}
      </p>
    </Card>
  );
}
