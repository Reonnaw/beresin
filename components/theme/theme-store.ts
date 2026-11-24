import { useSyncExternalStore } from "react";

import {
  DARK_SCHEME_QUERY,
  parseThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from "@/components/theme/theme-config";

const CHANGE_EVENT = "beresin:theme-change";

function readPreference(): ThemePreference {
  try {
    return parseThemePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    // Storage can be blocked (private mode, strict cookie settings): fall back to the OS.
    return "system";
  }
}

function readResolvedTheme(): ResolvedTheme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

/** Resolves the stored preference onto <html data-theme> and tells every subscriber. */
export function applyStoredTheme() {
  document.documentElement.dataset.theme = resolveTheme(readPreference(), matchMedia(DARK_SCHEME_QUERY).matches);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function setThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Not persisted, but the switch still applies for this visit.
  }
  applyStoredTheme();
}

/** The user's choice. Renders "system" on the server, then the stored value right after hydration. */
export function useThemePreference(): ThemePreference {
  return useSyncExternalStore(subscribe, readPreference, () => "system");
}

/** The theme actually on screen, for code that cannot use CSS variables directly. */
export function useResolvedTheme(): ResolvedTheme {
  return useSyncExternalStore(subscribe, readResolvedTheme, () => "light");
}
