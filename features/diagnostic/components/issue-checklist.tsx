"use client";

import { Badge, type BadgeTone } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MODULE_LABELS, SEVERITY_LABELS } from "@/lib/constants/modules";
import { formatCostRange, formatDuration } from "@/lib/format";
import { useDiagnosticStore } from "@/stores/diagnostic-store";
import { useWorkbenchStore } from "@/stores/workbench-store";
import type { DiagnosticIssue, IssueSeverity } from "@/types/domain";

const SEVERITY_TONES = {
  low: "neutral",
  medium: "neutral",
  high: "danger",
  critical: "danger",
} as const satisfies Record<IssueSeverity, BadgeTone>;

/** Symptoms of the module selected on the canvas; checking one records a finding. */
export function IssueChecklist({ issues }: { issues: DiagnosticIssue[] }) {
  const selectedModule = useWorkbenchStore((s) => s.selectedModule);
  const findings = useDiagnosticStore((s) => s.findings);
  const toggleFinding = useDiagnosticStore((s) => s.toggleFinding);

  if (!selectedModule) {
    return (
      <EmptyState>Klik modul pada kanvas atau daftar modul untuk memeriksa gejalanya.</EmptyState>
    );
  }

  const moduleIssues = issues.filter((issue) => issue.module_type === selectedModule);

  return (
    <section className="flex flex-col gap-3" aria-live="polite">
      <div>
        <Eyebrow tone="muted">{selectedModule}</Eyebrow>
        <h2 className="text-lg font-bold tracking-tight">Gejala {MODULE_LABELS[selectedModule]}</h2>
      </div>
      {moduleIssues.length === 0 ? (
        <p className="text-sm text-muted">Belum ada data kerusakan untuk modul ini.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {moduleIssues.map((issue) => (
            <li key={issue.id}>
              <label className="flex cursor-pointer gap-3 rounded-sm border border-border p-3 has-checked:border-danger has-checked:bg-danger/5">
                <input
                  type="checkbox"
                  checked={findings.some((f) => f.issueId === issue.id)}
                  onChange={() => toggleFinding(issue)}
                  className="mt-0.5 size-4 shrink-0 accent-danger"
                />
                <span className="flex flex-1 flex-col gap-1.5">
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold">{issue.title}</span>
                    <Badge tone={SEVERITY_TONES[issue.severity]}>
                      {SEVERITY_LABELS[issue.severity]}
                    </Badge>
                  </span>
                  <span className="text-xs text-muted">{issue.symptoms.join(" · ")}</span>
                  <span className="flex justify-between font-mono text-xs">
                    <span>
                      {formatCostRange(issue.estimated_cost_min, issue.estimated_cost_max)}
                    </span>
                    <span className="text-muted">
                      {formatDuration(issue.estimated_duration_minutes)}
                    </span>
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
