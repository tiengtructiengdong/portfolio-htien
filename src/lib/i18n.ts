/**
 * i18n.ts
 * Minimal i18n utility for the portfolio site.
 *
 * Supports SSR (Astro .astro files) and CSR (React islands).
 *
 * Usage (Astro):
 *   import { t, localeFromUrl } from "@lib/i18n";
 *   const locale = localeFromUrl(Astro.url);
 *   t(locale, "nav.work")  // => "Work"
 *
 * Usage (React):
 *   import { t, useLocale } from "@lib/i18n";
 *   t(useLocale(), "nav.work")
 *
 * The t() function signature takes the locale as the first argument
 * so it works identically in both SSR and CSR contexts without hooks.
 */

// --------------- Types ---------------

export type Locale = "en" | "ja" | "ko" | "vi";

export interface LocaleStrings {
  [key: string]: string | LocaleStrings;
}

// --------------- Registry ---------------

const _registry = new Map<Locale, LocaleStrings>();

/**
 * Register a locale's strings. Idempotent — safe to call multiple times.
 */
export function registerLocale(locale: Locale, strings: LocaleStrings): void {
  if (!_registry.has(locale)) {
    _registry.set(locale, strings);
  }
}

// --------------- Init (auto-run on first import) ---------------

// Lazy init — registers all locales the first time a translation is needed.
let _initialized = false;
function ensureLocales(): void {
  if (_initialized) {
    return;
  }
  _initialized = true;
  // Dynamic import of locale JSON files
  // The actual strings are loaded in BaseLayout.astro which calls registerLocale.
  // This is a no-op fallback if no one has registered yet.
}

// --------------- Translation function ---------------

/**
 * Resolve a dot-separated key against a nested locale object.
 * e.g. resolve(strings, "nav.work") => strings["nav"]["work"]
 */
function resolve(obj: LocaleStrings, key: string): string {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") {
      return key;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : key;
}

/**
 * Translate a key for the given locale.
 *
 * @param locale - The target locale.
 * @param key    - Dot-separated key, e.g. "nav.work".
 * @returns      The translated string, or the key itself if not found.
 */
export function t(locale: Locale, key: string): string {
  const strings = _registry.get(locale) ?? _registry.get("en");
  if (!strings) return key;
  return resolve(strings, key);
}

/**
 * Detect locale from localStorage (where atomWithStorage persists it).
 * Falls back to "en".
 */
export function useLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem("portfolio-lang");
    if (
      stored === "ja" ||
      stored === "ko" ||
      stored === "vi" ||
      stored === "en"
    )
      return stored;
  } catch {
    // localStorage may be unavailable (private browsing, etc.)
  }
  return "en";
}

/**
 * Detect locale from Astro's URL (server-side).
 */
export function localeFromUrl(url: URL): Locale {
  const lang = url.searchParams.get("lang");
  if (lang === "ja" || lang === "ko" || lang === "vi" || lang === "en")
    return lang;
  return "en";
}

/**
 * Get the <html lang=""> attribute value for a locale.
 */
export function langAttr(locale: Locale): string {
  return locale;
}

/**
 * Create a scoped translation function bound to a locale.
 * Convenience wrapper so callers don't have to pass `locale` to every call.
 *
 * @example
 *   const t = useTranslations("en");
 *   t("nav.work") // => "Work"
 */
export function useTranslations(locale: Locale): (key: string) => string {
  return (key: string) => t(locale, key);
}
