"use client";

import { useEffect } from "react";

import { useDiagnosticStore } from "@/stores/diagnostic-store";

/** Loads persisted stores from localStorage once the app has hydrated. */
export function StoreHydration() {
  useEffect(() => {
    void useDiagnosticStore.persist.rehydrate();
  }, []);
  return null;
}
