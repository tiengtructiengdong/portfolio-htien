/**
 * LanguageSelector.tsx
 * A dropdown / button-group to switch the site language.
 *
 * Reads/writes the persisted languageAtom (atomWithStorage).
 * No page reload — the locale is stored in localStorage and
 * consumed by client-side components via the Jotai atom.
 *
 * Hydrated with client:load or client:idle.
 */

import { useAtom } from "jotai";
import { languageAtom } from "@stores/info";
import type { Locale } from "@stores/info";
import clsx from "clsx";

const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ja", label: "JA" },
  { value: "ko", label: "KO" },
  { value: "vi", label: "VI" },
];

export interface LanguageSelectorProps {
  className?: string;
  /** When true, renders as a horizontal button group (desktop). */
  inline?: boolean;
}

export default function LanguageSelector({
  className = "",
  inline = false,
}: LanguageSelectorProps): React.ReactElement {
  const [locale, setLocale] = useAtom(languageAtom);

  function handleChange(next: Locale): void {
    if (next === locale) {
      return;
    }
    setLocale(next);
  }

  if (inline) {
    return (
      <div
        className={clsx("lang-selector", className)}
        role="group"
        aria-label="Language"
      >
        {LOCALES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={clsx("lang-selector__btn", value === locale && "lang-selector__btn--active")}
            onClick={() => handleChange(value)}
            aria-pressed={value === locale}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <select
      className={clsx("lang-selector", className)}
      value={locale}
      onChange={(e) => handleChange(e.target.value as Locale)}
      aria-label="Language"
    >
      {LOCALES.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
