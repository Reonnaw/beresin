import type { DiagnosticIssue } from "@/types/domain";

export type DiagnosisEstimate = {
  issues: DiagnosticIssue[];
  costMin: number;
  costMax: number;
  durationMinutes: number;
};

/** Sums the chosen issues. Unknown ids (e.g. stale ones from storage) are ignored. */
export function estimateDiagnosis(
  issues: readonly DiagnosticIssue[],
  issueIds: readonly string[],
): DiagnosisEstimate {
  const chosen = issues.filter((issue) => issueIds.includes(issue.id));
  return {
    issues: chosen,
    costMin: chosen.reduce((sum, issue) => sum + issue.estimated_cost_min, 0),
    costMax: chosen.reduce((sum, issue) => sum + issue.estimated_cost_max, 0),
    durationMinutes: chosen.reduce((sum, issue) => sum + issue.estimated_duration_minutes, 0),
  };
}
