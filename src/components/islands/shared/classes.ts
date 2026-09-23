/**
 * classes.ts
 * Tailwind class constants shared across multiple island components.
 * (Component-specific classes live in each component's own folder;
 *  classes shared with Astro/dom layouts remain in @lib/classes.)
 */
import clsx from "clsx";

/** Period text in timeline. */
export const PERIOD_TEXT = "font-mono text-xs text-[var(--color-fg-muted)]";

/** Modal overlay backdrop. */
export const MODAL_OVERLAY = clsx(
  "fixed inset-0 z-50 flex items-center justify-center",
  "bg-black/60 backdrop-blur-sm",
);

/** Mac-style modal window. */
export const MODAL_WINDOW = clsx(
  "relative flex max-h-[85vh] w-full max-w-[800px] flex-col",
  "overflow-hidden rounded-xl border border-white/10",
  "bg-[#0d0d18]/95 shadow-2xl backdrop-blur-xl",
);

/** Mac-style title bar (traffic lights). */
export const MODAL_TITLE_BAR = clsx(
  "flex items-center gap-2 border-b border-white/10",
  "bg-white/5 px-4 py-3",
);

/** Mac traffic light button. */
export const TRAFFIC_LIGHT = "!h-3 !w-3 rounded-full";

/** Modal body (scrollable). */
export const MODAL_BODY = "flex-1 overflow-y-auto p-6";
