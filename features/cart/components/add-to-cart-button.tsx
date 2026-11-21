"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { CartProduct } from "@/features/cart/lib/cart";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/stores/cart-store";

export function AddToCartButton({ product, className }: { product: CartProduct; className?: string }) {
  const inCart = useCartStore(
    (s) => s.items.find((item) => item.sparePartId === product.id)?.quantity ?? 0,
  );
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const soldOut = product.stock <= 0;
  const maxed = !soldOut && inCart >= product.stock;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Button
        variant="accent"
        disabled={soldOut || maxed}
        onClick={() => {
          addItem(product);
          setAdded(true);
        }}
      >
        {soldOut ? "Stok habis" : maxed ? "Maksimal stok" : "Tambah ke keranjang"}
      </Button>
      <p className="min-h-4 font-mono text-xs text-muted" aria-live="polite">
        {added && inCart > 0 ? `${inCart} di keranjang` : ""}
      </p>
    </div>
  );
}
