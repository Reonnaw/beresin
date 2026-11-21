import { DiagnosisSummary } from "@/features/diagnostic/components/diagnosis-summary";
import { IssueChecklist } from "@/features/diagnostic/components/issue-checklist";
import { getDiagnosticIssues } from "@/features/diagnostic/services/diagnostic-service";

export async function DiagnosticSection() {
  const issues = await getDiagnosticIssues();
  return (
    <>
      <IssueChecklist issues={issues} />
      <DiagnosisSummary issues={issues} />
    </>
  );
}
