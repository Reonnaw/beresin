"use client";

import { MODULE_LABELS } from "@/lib/constants/modules";
import { MODULE_LAYOUT } from "@/features/workbench/lib/module-layout";
import { useWorkbenchStore } from "@/stores/workbench-store";

export function ModuleInspector() {
  const selectedModule = useWorkbenchStore((s) => s.selectedModule);

  if (!selectedModule) {
    return (
      <section className="rounded-[4px] border border-dashed border-border p-4 text-sm text-muted">
        Klik modul pada kanvas atau daftar untuk menginspeksinya.
      </section>
    );
  }

  const partCount = MODULE_LAYOUT[selectedModule].parts.length;

  return (
    <section
      aria-live="polite"
      className="flex flex-col gap-2 rounded-[4px] border border-border p-4"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-muted">
        Modul terpilih
      </p>
      <h2 className="text-lg font-semibold">{MODULE_LABELS[selectedModule]}</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        <dt className="text-muted">Kode</dt>
        <dd className="font-mono">{selectedModule}</dd>
        <dt className="text-muted">Unit</dt>
        <dd className="font-mono">{partCount}</dd>
      </dl>
    </section>
  );
}
