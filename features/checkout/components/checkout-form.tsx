"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button, buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, inputStyles } from "@/components/ui/field";
import { useCartHydrated } from "@/features/cart/hooks/use-cart-hydrated";
import { cartSummary } from "@/features/cart/lib/cart";
import { type CheckoutState, placeOrder } from "@/features/checkout/actions";
import { formatRupiah } from "@/lib/format";
import { useCartStore } from "@/stores/cart-store";

export function CheckoutForm() {
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const [state, formAction, pending] = useActionState<CheckoutState, FormData>(placeOrder, {});

  if (!hydrated) return <p className="font-mono text-sm text-muted">Memuat keranjang…</p>;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[4px] border border-dashed border-border p-8">
        <p className="text-muted">Keranjang kosong, belum ada yang bisa di-checkout.</p>
        <Link href="/spare-parts" className={buttonStyles({ variant: "secondary" })}>
          Lihat katalog spare part
        </Link>
      </div>
    );
  }

  const { subtotal } = cartSummary(items);
  const lines = items.map((item) => ({ spare_part_id: item.sparePartId, quantity: item.quantity }));

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <input type="hidden" name="items" value={JSON.stringify(lines)} />

      <Card className="flex flex-col gap-4 p-5">
        <h2 className="font-semibold">Pengiriman</h2>
        <Field id="shippingAddress" label="Alamat lengkap" hint="Nama penerima, jalan, kota, kode pos.">
          <textarea
            id="shippingAddress"
            name="shippingAddress"
            rows={4}
            maxLength={500}
            required
            aria-describedby="shippingAddress-message"
            className={inputStyles}
          />
        </Field>
      </Card>

      <Card className="flex h-fit flex-col gap-4 p-5">
        <h2 className="font-semibold">Pesanan</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {items.map((item) => (
            <li key={item.sparePartId} className="flex justify-between gap-3">
              <span>
                {item.name} <span className="font-mono text-muted">×{item.quantity}</span>
              </span>
              <span className="font-mono">{formatRupiah(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-border pt-3">
          <span className="text-sm text-muted">Total</span>
          <span className="font-mono text-lg font-semibold">{formatRupiah(subtotal)}</span>
        </div>
        <p className="text-sm text-danger" aria-live="polite">
          {state.error}
        </p>
        <Button type="submit" disabled={pending}>
          {pending ? "Memproses pesanan…" : "Buat pesanan"}
        </Button>
      </Card>
    </form>
  );
}
