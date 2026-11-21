import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { requireUser } from "@/features/auth/services/auth-service";
import { getDiagnosticIssues } from "@/features/diagnostic/services/diagnostic-service";
import { BookingForm } from "@/features/service/components/booking-form";
import { getLaptopModels } from "@/features/spare-parts/services/spare-part-service";
import { WORKBENCH_MODEL_SLUG } from "@/features/workbench/lib/module-layout";

export const metadata: Metadata = { title: "Booking Servis" };

async function SignedInBooking() {
  await requireUser("/service/book");
  const [models, issues] = await Promise.all([getLaptopModels(), getDiagnosticIssues()]);
  const defaultModelId = models.find((model) => model.slug === WORKBENCH_MODEL_SLUG)?.id;
  return <BookingForm models={models} issues={issues} defaultModelId={defaultModelId} />;
}

export default function ServiceBookPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8">
      <PageHeader
        title="Booking Servis"
        description="Hasil diagnosis dari Workbench ikut terkirim ke teknisi beserta estimasi biayanya."
      />
      <Suspense fallback={<p className="font-mono text-sm text-muted">Memeriksa sesi…</p>}>
        <SignedInBooking />
      </Suspense>
    </main>
  );
}
