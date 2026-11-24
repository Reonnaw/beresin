import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { LoadingText } from "@/components/ui/loading-text";
import { requireUser } from "@/features/auth/services/auth-service";
import { CheckoutForm } from "@/features/checkout/components/checkout-form";

export const metadata: Metadata = { title: "Checkout" };

async function SignedInCheckout() {
  await requireUser("/checkout");
  return <CheckoutForm />;
}

export default function CheckoutPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8">
      <PageHeader
        eyebrow="Belanja · langkah akhir"
        title="Checkout"
        description="Harga dan stok dihitung ulang dari katalog saat pesanan dibuat."
      />
      <Suspense fallback={<LoadingText>Memeriksa sesi…</LoadingText>}>
        <SignedInCheckout />
      </Suspense>
    </main>
  );
}
