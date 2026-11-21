"use client";

import { useSyncExternalStore } from "react";

import { useCartStore } from "@/stores/cart-store";

// Accessed lazily: the persist API only exists in the browser, where localStorage does.
const subscribe = (onChange: () => void) => useCartStore.persist.onFinishHydration(onChange);
const getSnapshot = () => useCartStore.persist.hasHydrated();
const getServerSnapshot = () => false;

/** False on the server and until localStorage has loaded, so an empty cart never flashes. */
export function useCartHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
