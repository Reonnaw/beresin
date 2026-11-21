import { Suspense } from "react";

import { getDiagnosticIssues } from "@/features/diagnostic/services/diagnostic-service";
import { LoadErrorBoundary } from "@/features/home/components/load-error-boundary";
import { ServiceSlip } from "@/features/home/components/service-slip";

async function ServiceSlipLoader() {
  const issues = await getDiagnosticIssues();
  return <ServiceSlip issues={issues} />;
}

/** The paper: perforated top edge, header and question stay put while the symptom list loads. */
export function ServiceSlipPanel() {
  return (
    <div className="flex flex-col">
      {/* Perforation: page-colored punches cut into the slip's top edge, the one motif of the homepage. */}
      <div
        aria-hidden
        className="h-2.5 border-x border-border bg-[radial-gradient(circle_at_8px_0,var(--background)_5px,var(--surface)_5.5px)] bg-size-[16px_10px] bg-repeat-x"
      />
      <div className="flex flex-col gap-6 rounded-b-[4px] border border-t-0 border-border bg-surface px-5 pt-4 pb-6 sm:px-7">
        <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-border pb-3 font-mono text-xs text-muted">
          <span>NOTA SERVIS</span>
          <span>Draf, belum dikirim</span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Laptopmu kenapa?</h1>
          <p className="text-muted">Pilih gejala yang kamu alami. Nota ini menghitung perkiraan biayanya.</p>
        </div>
        <LoadErrorBoundary message="Daftar keluhan gagal dimuat. Coba lagi, atau langsung booking servis.">
          <Suspense fallback={<p className="font-mono text-sm text-muted">Memuat daftar keluhan…</p>}>
            <ServiceSlipLoader />
          </Suspense>
        </LoadErrorBoundary>
      </div>
    </div>
  );
}
