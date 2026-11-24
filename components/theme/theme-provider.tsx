"use client";

import { type ReactNode, useEffect } from "react";

import { DARK_SCHEME_QUERY, THEME_STORAGE_KEY } from "@/components/theme/theme-config";
import { applyStoredTheme } from "@/components/theme/theme-store";

/**
 * Keeps <html data-theme> in sync after the head script has set it: follows OS
 * changes while on "system" and picks up a switch made in another tab.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = matchMedia(DARK_SCHEME_QUERY);
    const onStorage = (event: StorageEvent) => {
      // A null key means storage was cleared.
      if (event.key === THEME_STORAGE_KEY || event.key === null) applyStoredTheme();
    };

    media.addEventListener("change", applyStoredTheme);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", applyStoredTheme);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return children;
}
