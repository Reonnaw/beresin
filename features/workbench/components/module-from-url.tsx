"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { parseModuleType } from "@/lib/search-params";
import { useWorkbenchStore } from "@/stores/workbench-store";

/** Selects the module named in `?module=` so deep links open straight on its checklist. */
export function ModuleFromUrl() {
  const moduleType = parseModuleType(useSearchParams().get("module") ?? undefined);
  const selectModule = useWorkbenchStore((s) => s.selectModule);

  useEffect(() => {
    if (moduleType) selectModule(moduleType);
  }, [moduleType, selectModule]);

  return null;
}
