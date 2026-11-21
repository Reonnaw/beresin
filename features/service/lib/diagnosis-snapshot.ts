import type { Json } from "@/types/database";
import type { DiagnosisSnapshot } from "@/types/domain";

/** The jsonb column is untyped; read only the issue ids we need and tolerate older shapes. */
export function readFindingIssueIds(diagnosis: Json): string[] {
  if (!diagnosis || typeof diagnosis !== "object" || Array.isArray(diagnosis)) return [];
  const { findings } = diagnosis as Partial<DiagnosisSnapshot>;
  if (!Array.isArray(findings)) return [];
  return findings.flatMap((f) => (typeof f?.issueId === "string" ? [f.issueId] : []));
}
