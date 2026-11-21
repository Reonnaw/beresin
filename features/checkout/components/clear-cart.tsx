"use client";

import { useEffect } from "react";

import { useCartStore } from "@/stores/cart-store";

/** Empties the cart once the order exists in the database. */
export function ClearCart() {
  useEffect(() => {
    useCartStore.getState().clear();
  }, []);
  return null;
}
