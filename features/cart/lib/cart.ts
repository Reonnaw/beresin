import type { SparePart } from "@/types/domain";

/** Display snapshot only: checkout re-prices every item from the database. */
export type CartItem = Pick<SparePart, "sku" | "name" | "price" | "stock"> & {
  sparePartId: string;
  quantity: number;
};

export type CartProduct = Pick<SparePart, "id" | "sku" | "name" | "price" | "stock">;

/** Narrows a part before it crosses to the client, keeping the payload small. */
export function toCartProduct({ id, sku, name, price, stock }: CartProduct): CartProduct {
  return { id, sku, name, price, stock };
}

const clamp = (value: number, max: number) => Math.max(0, Math.min(Math.trunc(value), max));

export function addToCart(items: CartItem[], product: CartProduct, quantity = 1): CartItem[] {
  const existing = items.find((item) => item.sparePartId === product.id);
  const nextQuantity = clamp((existing?.quantity ?? 0) + quantity, product.stock);
  if (nextQuantity === 0) return items;

  const item: CartItem = {
    sparePartId: product.id,
    sku: product.sku,
    name: product.name,
    price: product.price,
    stock: product.stock,
    quantity: nextQuantity,
  };
  return existing
    ? items.map((i) => (i.sparePartId === product.id ? item : i))
    : [...items, item];
}

/** Quantity 0 (or less) removes the item; anything above stock is capped. */
export function setCartQuantity(items: CartItem[], sparePartId: string, quantity: number): CartItem[] {
  return items.flatMap((item) => {
    if (item.sparePartId !== sparePartId) return [item];
    const next = clamp(quantity, item.stock);
    return next === 0 ? [] : [{ ...item, quantity: next }];
  });
}

export function cartSummary(items: readonly CartItem[]) {
  return {
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.quantity * item.price, 0),
  };
}
