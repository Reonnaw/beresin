export const THEME_STORAGE_KEY = "beresin-theme";

export const THEME_PREFERENCES = ["light", "dark", "system"] as const;
export type ThemePreference = (typeof THEME_PREFERENCES)[number];
export type ResolvedTheme = Exclude<ThemePreference, "system">;

export const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

/*
 * The two functions below are also serialized into the inline <head> script,
 * so they must stay self-contained: no imports, no references to other bindings.
 */

/** Anything but an explicit light or dark choice, including missing storage, means "follow the OS". */
export function parseThemePreference(value: unknown): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

export function resolveTheme(preference: ThemePreference, systemPrefersDark: boolean): ResolvedTheme {
  if (preference === "system") return systemPrefersDark ? "dark" : "light";
  return preference;
}
