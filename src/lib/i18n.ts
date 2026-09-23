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
 *
 * On the client, locales are auto-registered from the bundled JSON files
 * so that React islands can translate without needing a server-side
 * registerLocale call.
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

// --------------- Client-side auto-registration ---------------

let _initialized = false;

/**
 * On the client, eagerly import and register all locale JSON files so that
 * the t() function works without a prior registerLocale() call from an
 * Astro layout. On the server this is a no-op — base-layout.astro handles
 * registration.
 */
function ensureLocales(): void {
  if (_initialized) {
    return;
  }
  _initialized = true;

  if (typeof window === "undefined") {
    // Server-side: registration is handled by base-layout.astro
    return;
  }

  // Client-side: dynamically import all locale JSON files and register them.
  // Vite will bundle these into the client chunk that imports this module.
  Promise.all([
    import("../locales/en.json").then((m) =>
      registerLocale("en", m.default ?? m),
    ),
    import("../locales/ja.json").then((m) =>
      registerLocale("ja", m.default ?? m),
    ),
    import("../locales/ko.json").then((m) =>
      registerLocale("ko", m.default ?? m),
    ),
    import("../locales/vi.json").then((m) =>
      registerLocale("vi", m.default ?? m),
    ),
  ]).catch(() => {
    // Silently fail — t() will return keys as fallback
  });
}

// Kick off registration immediately on module load (client-side only).
// The dynamic imports are hoisted by Vite into the importing chunk.
if (typeof window !== "undefined") {
  ensureLocales();
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
  if (!strings) {
    return key;
  }
  return resolve(strings, key);
}

/**
 * Detect locale from localStorage (where atomWithStorage persists it).
 * Falls back to "en".
 */
export function useLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }
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
