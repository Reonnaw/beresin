"use client";

import Link from "next/link";

import { Button, buttonStyles, focusRing } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingText } from "@/components/ui/loading-text";
import { QuantityInput } from "@/features/cart/components/quantity-input";
import { cartSummary } from "@/features/cart/lib/cart";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/format";
import { useCartStore } from "@/stores/cart-store";

export function CartView() {
  const hydrated = usePersistHydrated(useCartStore);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!hydrated) {
    return <LoadingText>Memuat keranjang…</LoadingText>;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        action={
          <Link href="/spare-parts" className={buttonStyles({ variant: "secondary" })}>
            Lihat katalog spare part
          </Link>
        }
      >
        Keranjang masih kosong.
      </EmptyState>
    );
  }

  const { count, subtotal } = cartSummary(items);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <ul className="flex flex-col divide-y divide-border rounded-md border border-border bg-surface">
        {items.map((item) => (
          <li key={item.sparePartId} className="flex flex-wrap items-center gap-4 p-4">
            <div className="flex min-w-48 flex-1 flex-col gap-0.5">
              <Link
                href={`/spare-parts/${encodeURIComponent(item.sku)}`}
                className={cn("font-semibold hover:underline", focusRing)}
              >
                {item.name}
              </Link>
              <span className="font-mono text-xs text-muted">
                {item.sku} · {formatRupiah(item.price)}
              </span>
            </div>
            <QuantityInput
              label={`Jumlah ${item.name}`}
              value={item.quantity}
              max={item.stock}
              onChange={(quantity) => setQuantity(item.sparePartId, quantity)}
            />
            <span className="w-32 text-right font-mono font-semibold tabular-nums">
              {formatRupiah(item.price * item.quantity)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.sparePartId)}
              aria-label={`Hapus ${item.name}`}
            >
              Hapus
            </Button>
          </li>
        ))}
      </ul>

      <Card className="flex h-fit flex-col gap-4 p-5">
        <h2 className="font-bold tracking-tight">Ringkasan</h2>
        <dl className="grid grid-cols-[1fr_auto] gap-y-2 text-sm">
          <dt className="text-muted">Jumlah barang</dt>
          <dd className="font-mono">{count}</dd>
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-mono text-base font-semibold tabular-nums">{formatRupiah(subtotal)}</dd>
        </dl>
        <p className="text-xs text-muted">
          Harga dan stok dicek ulang saat checkout.
        </p>
        <Link href="/checkout" className={buttonStyles()}>
          Lanjut ke checkout
        </Link>
      </Card>
    </div>
  );
}
