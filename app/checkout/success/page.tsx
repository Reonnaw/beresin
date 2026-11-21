import type { Metadata } from "next";
import { Suspense } from "react";

import { OrderConfirmation } from "@/features/checkout/components/order-confirmation";

export const metadata: Metadata = { title: "Pesanan Dibuat" };

export default function CheckoutSuccessPage(props: PageProps<"/checkout/success">) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-10">
      <Suspense fallback={<p className="font-mono text-sm text-muted">Memuat pesanan…</p>}>
        <OrderConfirmation searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
