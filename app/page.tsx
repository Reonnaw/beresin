import type { Metadata } from "next";
import { Suspense } from "react";

import { DiagnosticSection } from "@/features/diagnostic/components/diagnostic-section";
import { ExplodeControl } from "@/features/workbench/components/explode-control";
import { ModuleList } from "@/features/workbench/components/module-list";
import { WorkbenchCanvas } from "@/features/workbench/components/workbench-canvas";

export const metadata: Metadata = { title: "Workbench" };

export default function WorkbenchPage() {
  return (
    <main className="grid flex-1 lg:h-[calc(100dvh-3.5rem)] lg:grid-cols-[minmax(0,1fr)_360px]">
      <section aria-label="Kanvas 3D laptop modular" className="h-[55vh] min-h-[360px] lg:h-full">
        <WorkbenchCanvas />
      </section>
      <aside className="flex flex-col gap-6 border-t border-border bg-surface p-5 lg:overflow-y-auto lg:border-t-0 lg:border-l">
        <h1 className="text-xl font-semibold tracking-tight">Workbench</h1>
        <Suspense
          fallback={<p className="font-mono text-sm text-muted">Memuat data diagnostik…</p>}
        >
          <DiagnosticSection />
        </Suspense>
        <ExplodeControl />
        <ModuleList />
      </aside>
    </main>
  );
}
