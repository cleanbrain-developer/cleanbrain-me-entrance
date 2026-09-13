export type Locale = "ko" | "en";

// No backend, so this is browser-locale detection (navigator.language),
// not IP/geo-based country detection -- see docs/architecture/overview.md
// "Internationalization". Anything not Korean defaults to English.
export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";

  const candidates =
    navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language];

  for (const lang of candidates) {
    if (lang?.toLowerCase().startsWith("ko")) return "ko";
  }
  return "en";
}

// A visitor can override the detected locale with the KO/EN toggle in the
// header; the choice is remembered per-browser so it doesn't reset on
// every visit. This is a plain per-viewer convenience, not shared state,
// so localStorage is appropriate -- wrapped defensively since it can throw
// (private browsing, disabled storage) and that must never break the page.
const STORAGE_KEY = "cleanbrain-entrance-locale";

export function loadStoredLocale(): Locale | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "ko" || value === "en" ? value : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage unavailable -- the toggle still works for the current page
    // view via reactive state, it just won't be remembered next visit.
  }
}
