import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { addToCart, type CartItem, type CartProduct, setCartQuantity } from "@/features/cart/lib/cart";

type CartState = {
  items: CartItem[];
  addItem: (product: CartProduct, quantity?: number) => void;
  setQuantity: (sparePartId: string, quantity: number) => void;
  removeItem: (sparePartId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity) => set((s) => ({ items: addToCart(s.items, product, quantity) })),
      setQuantity: (id, quantity) => set((s) => ({ items: setCartQuantity(s.items, id, quantity) })),
      removeItem: (id) => set((s) => ({ items: setCartQuantity(s.items, id, 0) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "beresin-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ items }) => ({ items }),
      skipHydration: true,
    },
  ),
);
