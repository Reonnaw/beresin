"use client";

import Link from "next/link";

import { Button, buttonStyles, focusRing } from "@/components/ui/button";
import { estimateDiagnosis } from "@/features/diagnostic/lib/estimate";
import { SYMPTOM_GROUP_LABELS } from "@/features/home/data/home-content";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { cn } from "@/lib/cn";
import { MODULE_LABELS, MODULE_TYPES } from "@/lib/constants/modules";
import { formatCostRange, formatDuration } from "@/lib/format";
import { useDiagnosticStore } from "@/stores/diagnostic-store";
import { useWorkbenchStore } from "@/stores/workbench-store";
import type { DiagnosticIssue } from "@/types/domain";

const linkStyles = cn("font-semibold underline underline-offset-4", focusRing);

function SymptomChip({ issue }: { issue: DiagnosticIssue }) {
  const checked = useDiagnosticStore((s) => s.findings.some((f) => f.issueId === issue.id));
  const toggleFinding = useDiagnosticStore((s) => s.toggleFinding);

  return (
    <label
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center rounded-[4px] border border-border bg-surface px-3 text-sm transition-colors hover:border-foreground/40 sm:min-h-9",
        "has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggleFinding(issue)}
        className="sr-only"
      />
      {/* Owners describe what they see, so the chip shows the symptom and the slip prints the diagnosis. */}
      {issue.symptoms[0] ?? issue.title}
    </label>
  );
}

function SymptomGroups({ issues }: { issues: DiagnosticIssue[] }) {
  const selectedModule = useWorkbenchStore((s) => s.selectedModule);
  const selectModule = useWorkbenchStore((s) => s.selectModule);
  const groups = MODULE_TYPES.filter((type) => !selectedModule || type === selectedModule)
    .map((type) => ({ type, issues: issues.filter((issue) => issue.module_type === type) }))
    .filter((group) => group.issues.length > 0);

  return (
    <div className="flex flex-col gap-5">
      {selectedModule && (
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
          <span className="text-muted">
            Disaring ke bagian {MODULE_LABELS[selectedModule]} yang kamu klik.
          </span>
          <button type="button" onClick={() => selectModule(null)} className={linkStyles}>
            Tampilkan semua keluhan
          </button>
        </p>
      )}
      {groups.length === 0 && (
        <p className="text-sm text-muted">Belum ada keluhan tercatat untuk bagian ini.</p>
      )}
      {groups.map((group) => (
        <fieldset key={group.type}>
          <legend className="pb-2 font-mono text-xs text-muted">
            {SYMPTOM_GROUP_LABELS[group.type]}
          </legend>
          <div className="flex flex-wrap gap-2">
            {group.issues.map((issue) => (
              <SymptomChip key={issue.id} issue={issue} />
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

function SlipLines({ issues }: { issues: DiagnosticIssue[] }) {
  const hydrated = usePersistHydrated(useDiagnosticStore);
  const findings = useDiagnosticStore((s) => s.findings);
  const clear = useDiagnosticStore((s) => s.clear);
  const estimate = estimateDiagnosis(
    issues,
    findings.map((f) => f.issueId),
  );

  if (!hydrated) {
    return <p className="font-mono text-sm text-muted">Memuat nota…</p>;
  }

  if (estimate.issues.length === 0) {
    return (
      <div className="flex flex-col gap-2 text-sm text-muted">
        <p>Belum ada keluhan. Pilih gejala yang kamu alami di atas.</p>
        <p>
          Tidak yakin?{" "}
          <Link href="/workbench" className={cn(linkStyles, "text-foreground")}>
            Bongkar modelnya di workbench
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col">
        {estimate.issues.map((issue) => (
          <li key={issue.id} className="flex items-baseline gap-2 py-1.5">
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{issue.title}</span>
              <span className="font-mono text-xs text-muted">
                {MODULE_LABELS[issue.module_type]} · {formatDuration(issue.estimated_duration_minutes)}
              </span>
            </span>
            <span aria-hidden className="min-w-4 flex-1 self-center border-b border-dotted border-muted/60" />
            <span className="shrink-0 font-mono text-sm">
              {formatCostRange(issue.estimated_cost_min, issue.estimated_cost_max)}
            </span>
          </li>
        ))}
      </ul>

      <dl aria-live="polite" className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t-2 border-accent pt-3">
        <dt className="font-semibold">Perkiraan biaya</dt>
        <dd className="text-right font-mono font-semibold">
          {formatCostRange(estimate.costMin, estimate.costMax)}
        </dd>
        <dt className="text-sm text-muted">Perkiraan pengerjaan</dt>
        <dd className="text-right font-mono text-sm">{formatDuration(estimate.durationMinutes)}</dd>
      </dl>
      <p className="text-xs text-muted">Ini perkiraan, bukan harga akhir.</p>

      <div className="flex flex-wrap gap-2">
        <Link href="/service/book" className={buttonStyles()}>
          Booking dengan nota ini
        </Link>
        <Link href="/workbench" className={buttonStyles({ variant: "secondary" })}>
          Bongkar di workbench
        </Link>
        <Button variant="ghost" onClick={clear}>
          Kosongkan
        </Button>
      </div>
    </div>
  );
}

/** Symptom picker and the running estimate it prints. Shares the diagnosis store with the workbench and booking form. */
export function ServiceSlip({ issues }: { issues: DiagnosticIssue[] }) {
  if (issues.length === 0) {
    return (
      <p className="text-sm text-muted">
        Daftar keluhan belum tersedia. Kamu tetap bisa{" "}
        <Link href="/service/book" className={cn(linkStyles, "text-foreground")}>
          booking servis
        </Link>{" "}
        dan teknisi akan memeriksa laptopmu menyeluruh.
      </p>
    );
  }

  return (
    <>
      <SymptomGroups issues={issues} />
      <section aria-label="Rincian nota" className="border-t border-dashed border-border pt-5">
        <SlipLines issues={issues} />
      </section>
    </>
  );
}
