import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { DiagnosisFinding, DiagnosticIssue } from "@/types/domain";

type DiagnosticState = {
  findings: DiagnosisFinding[];
  toggleFinding: (issue: Pick<DiagnosticIssue, "id" | "module_type">) => void;
  clear: () => void;
};

export const useDiagnosticStore = create<DiagnosticState>()(
  persist(
    (set) => ({
      findings: [],
      toggleFinding: (issue) =>
        set((state) => ({
          findings: state.findings.some((f) => f.issueId === issue.id)
            ? state.findings.filter((f) => f.issueId !== issue.id)
            : [...state.findings, { issueId: issue.id, moduleType: issue.module_type }],
        })),
      clear: () => set({ findings: [] }),
    }),
    {
      name: "beresin-diagnosis",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ findings }) => ({ findings }),
      // Rehydrated by <StoreHydration /> after mount so server and client markup match.
      skipHydration: true,
    },
  ),
);
