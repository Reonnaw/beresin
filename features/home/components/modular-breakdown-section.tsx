import Link from "next/link";

import { focusRing } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HOME_MODULES, type HomeModule } from "@/features/home/data/home-content";
import { cn } from "@/lib/cn";

const linkStyles = cn("text-sm font-semibold underline-offset-4 hover:underline", focusRing);

function ModuleCard({ module }: { module: HomeModule }) {
  return (
    <Card className="flex w-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 font-mono text-[11px] tracking-wide text-muted">
        <span>{module.moduleType.toUpperCase()}</span>
        <span>SKU {module.skuPrefix}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-semibold tracking-tight">{module.name}</h3>
        <p className="font-mono text-xs text-muted">{module.spec}</p>
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-semibold text-muted">Gejala umum</p>
          <ul className="flex flex-col gap-1 text-sm">
            {module.symptoms.map((symptom) => (
              <li key={symptom} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 shrink-0 bg-accent" />
                {symptom}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border bg-surface-muted px-4 py-3">
        <Link href={`/workbench?module=${module.moduleType}`} className={linkStyles}>
          Inspeksi modul →
        </Link>
        <Link
          href={`/spare-parts?module=${module.moduleType}`}
          className={cn(linkStyles, "font-medium text-muted hover:text-foreground")}
        >
          Lihat part
        </Link>
      </div>
    </Card>
  );
}

export function ModularBreakdownSection() {
  return (
    <section aria-labelledby="modules-title" className="mx-auto w-full max-w-7xl px-5 py-16">
      <div className="flex flex-col gap-2 pb-8">
        <p className="font-mono text-xs tracking-wide text-muted">
          {String(HOME_MODULES.length).padStart(2, "0")} MODUL // BONGKAR PASANG
        </p>
        <h2 id="modules-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Setiap modul bisa dilepas, diperiksa, dan diganti sendiri.
        </h2>
        <p className="max-w-2xl text-muted">
          Pilih modul untuk langsung membukanya di workbench, lengkap dengan checklist gejala dan
          estimasi biayanya.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_MODULES.map((module) => (
          <li key={module.moduleType} className="flex">
            <ModuleCard module={module} />
          </li>
        ))}
      </ul>
    </section>
  );
}
