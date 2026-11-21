import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { CartView } from "@/features/cart/components/cart-view";

export const metadata: Metadata = { title: "Keranjang" };

export default function CartPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8">
      <PageHeader title="Keranjang" description="Spare part yang akan kamu beli." />
      <CartView />
    </main>
  );
}
