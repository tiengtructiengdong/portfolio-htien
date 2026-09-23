/**
 * classes.ts
 * Tailwind class constants specific to the CompanyDetailContent component.
 */
import clsx from "clsx";

/** Tech stack badge. */
export const TECH_BADGE = clsx(
  "inline-block rounded-md border border-white/10",
  "bg-white/5 px-2 py-0.5 font-mono text-xs",
  "text-[var(--color-fg-muted)]",
);

/** Project card inside modal/detail. */
export const PROJECT_CARD = "rounded-lg border border-white/10 bg-white/5 p-4";
