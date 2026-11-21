import Link from "next/link";
import { Suspense } from "react";

import { focusRing } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadErrorBoundary } from "@/features/home/components/load-error-boundary";
import { StockBadge } from "@/features/spare-parts/components/stock-badge";
import { getLaptopModels, getSpareParts } from "@/features/spare-parts/services/spare-part-service";
import { cn } from "@/lib/cn";
import { MODULE_LABELS, MODULE_TYPES } from "@/lib/constants/modules";
import { formatRupiah } from "@/lib/format";

const linkStyles = cn("font-semibold underline underline-offset-4", focusRing);

async function PriceTable() {
  const parts = await getSpareParts();

  if (parts.length === 0) {
    return <p className="p-5 text-sm text-muted">Belum ada part di katalog.</p>;
  }

  const groups = MODULE_TYPES.map((type) => ({
    type,
    parts: parts.filter((part) => part.module_type === type),
  })).filter((group) => group.parts.length > 0);

  return (
    <table className="w-full text-sm">
      <caption className="sr-only">Harga dan stok spare part per modul</caption>
      <thead className="border-b border-border text-left font-mono text-xs text-muted">
        <tr>
          <th scope="col" className="hidden px-3 py-2.5 sm:px-4 font-normal sm:table-cell">SKU</th>
          <th scope="col" className="px-3 py-2.5 sm:px-4 font-normal">Part</th>
          <th scope="col" className="hidden px-3 py-2.5 sm:px-4 font-normal md:table-cell">Seri</th>
          <th scope="col" className="px-3 py-2.5 sm:px-4 text-right font-normal">Harga</th>
          <th scope="col" className="px-3 py-2.5 sm:px-4 text-right font-normal">Stok</th>
        </tr>
      </thead>
      {groups.map((group) => (
        <tbody key={group.type} className="border-b border-border last:border-b-0">
          <tr className="bg-surface-muted">
            <th scope="rowgroup" colSpan={5} className="px-3 py-1.5 sm:px-4 text-left text-xs font-semibold">
              {MODULE_LABELS[group.type]}
            </th>
          </tr>
          {group.parts.map((part) => (
            <tr key={part.id} className="border-t border-border first:border-t-0">
              <td className="hidden px-3 py-2.5 sm:px-4 font-mono text-xs text-muted sm:table-cell">{part.sku}</td>
              <td className="px-3 py-2.5 sm:px-4">
                <Link href={`/spare-parts/${part.sku}`} className={cn("hover:underline", focusRing)}>
                  {part.name}
                </Link>
                <span className="block font-mono text-xs text-muted sm:hidden">{part.sku}</span>
                <span className="block text-xs text-muted md:hidden">
                  {part.laptop_models?.name ?? "Semua seri"}
                </span>
              </td>
              <td className="hidden px-3 py-2.5 sm:px-4 text-muted md:table-cell">
                {part.laptop_models?.name ?? "Semua seri"}
              </td>
              <td className="px-3 py-2.5 sm:px-4 text-right font-mono whitespace-nowrap">{formatRupiah(part.price)}</td>
              <td className="px-3 py-2.5 sm:px-4 text-right">
                <StockBadge stock={part.stock} />
              </td>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}

async function SupportedModels() {
  const models = await getLaptopModels();
  if (models.length === 0) return null;
  return (
    <p className="text-sm">
      <span className="text-muted">Cocok untuk </span>
      {models.map((model) => model.name).join(" · ")}
    </p>
  );
}

/** Wall price list next to the counter: every active part, live from the catalog. */
export function PriceListSection() {
  return (
    <section aria-labelledby="price-list-title" className="bg-surface-muted">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        <div className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <h2 id="price-list-title" className="text-2xl font-semibold tracking-tight">
            Daftar harga part
          </h2>
          <p className="text-sm text-muted">Harga dan stok diambil langsung dari katalog.</p>
          <LoadErrorBoundary message="Daftar seri laptop gagal dimuat.">
            <Suspense fallback={<p className="font-mono text-xs text-muted">Memuat seri…</p>}>
              <SupportedModels />
            </Suspense>
          </LoadErrorBoundary>
          <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
            <Link href="/spare-parts" className={cn(linkStyles, "self-start")}>
              Buka katalog lengkap
            </Link>
            <p className="text-muted">
              Sudah booking?{" "}
              <Link href="/service/track" className={cn(linkStyles, "text-foreground")}>
                Lacak tiket servis
              </Link>
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <LoadErrorBoundary message="Daftar harga gagal dimuat.">
            <Suspense fallback={<p className="p-5 font-mono text-sm text-muted">Memuat daftar harga…</p>}>
              <PriceTable />
            </Suspense>
          </LoadErrorBoundary>
        </Card>
      </div>
    </section>
  );
}
