"use client";

import Link from "next/link";

import { Button, buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { estimateDiagnosis } from "@/features/diagnostic/lib/estimate";
import { MODULE_LABELS } from "@/lib/constants/modules";
import { formatCostRange, formatDuration } from "@/lib/format";
import { useDiagnosticStore } from "@/stores/diagnostic-store";
import type { DiagnosticIssue } from "@/types/domain";

export function DiagnosisSummary({ issues }: { issues: DiagnosticIssue[] }) {
  const findings = useDiagnosticStore((s) => s.findings);
  const toggleFinding = useDiagnosticStore((s) => s.toggleFinding);
  const clear = useDiagnosticStore((s) => s.clear);
  const estimate = estimateDiagnosis(
    issues,
    findings.map((f) => f.issueId),
  );

  return (
    <Card className="flex flex-col gap-3 p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold">Hasil diagnosis</h2>
        <span className="font-mono text-xs text-muted">{estimate.issues.length} temuan</span>
      </div>

      {estimate.issues.length === 0 ? (
        <p className="text-sm text-muted">Belum ada kerusakan yang dipilih.</p>
      ) : (
        <>
          <ul className="flex flex-col divide-y divide-border text-sm">
            {estimate.issues.map((issue) => (
              <li key={issue.id} className="flex items-center justify-between gap-2 py-1.5">
                <span>
                  <span className="font-mono text-xs text-danger">
                    {MODULE_LABELS[issue.module_type]}
                  </span>{" "}
                  {issue.title}
                </span>
                <span className="flex shrink-0 items-center">
                  <Link
                    href={`/spare-parts?module=${issue.module_type}`}
                    className={buttonStyles({ variant: "ghost", size: "sm" })}
                    aria-label={`Cari spare part ${MODULE_LABELS[issue.module_type]}`}
                  >
                    Part
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFinding(issue)}
                    aria-label={`Hapus ${issue.title}`}
                  >
                    ✕
                  </Button>
                </span>
              </li>
            ))}
          </ul>
          <dl className="grid grid-cols-[1fr_auto] gap-y-1 border-t border-border pt-3 text-sm">
            <dt className="text-muted">Estimasi biaya</dt>
            <dd className="font-mono font-semibold">
              {formatCostRange(estimate.costMin, estimate.costMax)}
            </dd>
            <dt className="text-muted">Estimasi waktu</dt>
            <dd className="font-mono">{formatDuration(estimate.durationMinutes)}</dd>
          </dl>
          <div className="flex gap-2">
            <Link href="/service/book" className={buttonStyles({ className: "flex-1" })}>
              Booking servis
            </Link>
            <Button variant="secondary" onClick={clear}>
              Reset
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
