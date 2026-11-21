"use client";

import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { useCartHydrated } from "@/features/cart/hooks/use-cart-hydrated";
import { cartSummary } from "@/features/cart/lib/cart";
import { useCartStore } from "@/stores/cart-store";

export function CartLink() {
  const hydrated = useCartHydrated();
  const count = useCartStore((s) => cartSummary(s.items).count);

  return (
    <Link href="/cart" className={buttonStyles({ variant: "secondary", size: "sm" })}>
      Keranjang
      <span className="font-mono tabular-nums" aria-label={`${count} barang`}>
        {hydrated ? count : "–"}
      </span>
    </Link>
  );
}
