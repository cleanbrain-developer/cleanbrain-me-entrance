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
