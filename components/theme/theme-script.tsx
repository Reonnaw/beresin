import {
  DARK_SCHEME_QUERY,
  parseThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
} from "@/components/theme/theme-config";

// Same functions the client store uses, so the first paint and later switches can never disagree.
const script = `(function(){try{var p=(${parseThemePreference})(localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)}));document.documentElement.dataset.theme=(${resolveTheme})(p,matchMedia(${JSON.stringify(
  DARK_SCHEME_QUERY,
)}).matches)}catch(e){}})()`;

/** Sets <html data-theme> while the head is parsed, before first paint, so a reload never flashes the wrong theme. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
