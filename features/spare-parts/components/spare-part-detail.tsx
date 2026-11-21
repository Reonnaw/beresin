import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { getDiagnosticIssues } from "@/features/diagnostic/services/diagnostic-service";
import { StockBadge } from "@/features/spare-parts/components/stock-badge";
import { getSparePartBySku } from "@/features/spare-parts/services/spare-part-service";
import { MODULE_LABELS } from "@/lib/constants/modules";
import { formatRupiah } from "@/lib/format";

export async function SparePartDetail({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const [part, issues] = await Promise.all([getSparePartBySku(sku), getDiagnosticIssues()]);
  if (!part) notFound();

  const fixes = issues.filter((issue) => issue.module_type === part.module_type);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            {MODULE_LABELS[part.module_type]} · {part.sku}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">{part.name}</h1>
          {part.description && <p className="max-w-2xl text-muted">{part.description}</p>}
        </div>

        <dl className="grid max-w-lg grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-border pt-4 text-sm">
          <dt className="text-muted">Modul</dt>
          <dd className="font-mono">{part.module_type}</dd>
          <dt className="text-muted">Kompatibel</dt>
          <dd>{part.laptop_models?.name ?? "Semua seri (universal)"}</dd>
          <dt className="text-muted">Stok</dt>
          <dd className="font-mono">{part.stock} unit</dd>
        </dl>

        {fixes.length > 0 && (
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold">Mengatasi kerusakan</h2>
            <ul className="flex flex-col gap-1 text-sm text-muted">
              {fixes.map((issue) => (
                <li key={issue.id}>· {issue.title}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <Card className="flex h-fit flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Harga</span>
          <StockBadge stock={part.stock} />
        </div>
        <p className="font-mono text-2xl font-semibold">{formatRupiah(part.price)}</p>
      </Card>
    </div>
  );
}
