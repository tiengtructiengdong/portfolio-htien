import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Locale = "en" | "ja" | "ko" | "vi";

export const basicInfo = atom({
  name: "Tien Huynh",
  title: "Full-stack Developer",
});

/**
 * Persisted language preference.
 * Stored in localStorage under key "portfolio-lang".
 * Falls back to "en" if no stored value.
 */
export const languageAtom = atomWithStorage<Locale>("portfolio-lang", "en");
