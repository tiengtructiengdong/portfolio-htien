/**
 * classes.ts
 * Shared Tailwind class constants used across multiple components.
 * Centralising these reduces duplication and makes global style
 * changes easier.
 */

// ── Card ──────────────────────────────────────────────────────
/** Standard card wrapper (rounded, bordered, semi-transparent). */
export const CARD =
  "relative overflow-hidden rounded-lg border border-white/10 " +
  "bg-[#0d0d18]/80 p-6 backdrop-blur-sm";

// ── Typography ────────────────────────────────────────────────
/** Muted mono label (e.g. dates, categories). */
export const MUTED_MONO = "font-mono text-sm text-[var(--color-fg-muted)]";

/** Accent heading (cyan, mono, small). */
export const ACCENT_HEADING = "font-mono text-sm font-medium text-cyan-400";

/** Large accent heading (cyan, mono, for page titles). */
export const ACCENT_HEADING_LG =
  "font-mono text-2xl font-semibold tracking-tight " +
  "text-cyan-400 sm:text-3xl";

/** Body text with muted colour. */
export const BODY_MUTED =
  "max-w-[65ch] leading-relaxed text-[var(--color-fg-muted)]";

/** Body text with default colour. */
export const BODY =
  "text-sm leading-relaxed text-[var(--color-fg)] sm:text-base";

// ── Layout ───────────────────────────────────────────────────
/** Standard article container (centred, responsive padding). */
export const ARTICLE = "mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8";

/** Wider article container for project detail pages. */
export const ARTICLE_WIDE =
  "mx-auto flex max-w-4xl flex-col gap-8 " + "px-4 py-16 sm:px-6 lg:px-8";

/** Back-link style (mono, muted, hover transition). */
export const BACK_LINK =
  "font-mono text-sm text-[var(--color-fg-muted)] " +
  "transition-colors hover:text-[var(--color-fg)]";

/** Project cover image. */
export const COVER_IMG =
  "aspect-[16/10] w-full rounded-lg " +
  "bg-[var(--color-bg-elevated)] object-cover";

/** Flex header with wrap (for project detail). */
export const FLEX_HEADER =
  "flex flex-wrap items-baseline justify-between gap-4";

// ── Shell / Page ─────────────────────────────────────────────
/** Desktop shell grid container. */
export const DESKTOP_SHELL =
  "desktop-shell relative mx-auto hidden min-h-screen " +
  "max-w-[1920px] grid-cols-[minmax(240px,1fr)_minmax(0,4fr)_minmax(240px,1fr)] " +
  "grid-rows-[auto_1fr_auto] gap-8 " +
  "px-[clamp(1rem,4vw,4rem)] py-8 lg:grid";

/** Desktop aside column. */
export const DESKTOP_ASIDE =
  "col-start-1 col-end-2 self-start lg:sticky lg:top-16";

/** Mobile shell flex container. */
export const MOBILE_SHELL =
  "mobile-shell flex min-h-screen flex-col gap-5 px-5 py-3 lg:hidden";

/** Main content wrapper (index page). */
export const MAIN =
  "relative z-10 mx-auto min-h-screen max-w-7xl " + "px-4 py-6 sm:px-6 lg:px-8";

/** Header bar (index page). */
export const HEADER_BAR =
  "mb-8 flex items-center justify-between rounded-lg " +
  "border border-white/10 bg-[#0d0d18]/60 px-4 py-3 " +
  "backdrop-blur-sm sm:mb-12";

/** Brand text (index page). */
export const BRAND =
  "font-mono text-sm font-semibold tracking-tight " +
  "text-[var(--color-fg)] sm:text-base";

// ── Work History ──────────────────────────────────────────────
/** Second row grid: 1/3 left + 2/3 right (desktop), stacked (mobile). */
export const SECOND_ROW = "grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3";

/** Left column (1/3) in the second row. */
export const SECOND_ROW_LEFT = "lg:col-span-1";

/** Right column (2/3) in the second row. */
export const SECOND_ROW_RIGHT = "lg:col-span-2";

/** Third row: full-width card, spaced below the second row. */
export const THIRD_ROW = "mt-4 sm:mt-6";

/** Desktop-only wrapper (hidden below the `lg` breakpoint). */
export const DESKTOP_ONLY = "hidden lg:block";

/** Timeline item row (dot + line + content). */
export const TIMELINE_ITEM = "relative flex gap-4 pb-6 last:pb-0";

/** Timeline dot. */
export const TIMELINE_DOT =
  "mt-1.5 h-3 w-3 shrink-0 rounded-full " +
  "border-2 border-cyan-400/60 bg-[#0d0d18] " +
  "transition-colors hover:border-cyan-400";

/** Timeline vertical line (pseudo-element via class). */
export const TIMELINE_LINE =
  "absolute left-[5px] top-4 bottom-0 w-px " +
  "bg-gradient-to-b from-cyan-400/40 to-transparent";

/** Timeline content (company name + period). */
export const TIMELINE_CONTENT =
  "flex-1 cursor-pointer rounded-md p-2 " +
  "transition-colors hover:bg-white/5";

/** Company name in timeline. */
export const COMPANY_NAME =
  "font-mono text-sm font-medium text-[var(--color-fg)] " +
  "transition-colors hover:text-cyan-400";

/** Period text in timeline. */
export const PERIOD_TEXT = "font-mono text-xs text-[var(--color-fg-muted)]";

// ── Modal (Mac-style window) ──────────────────────────────────
/** Modal overlay backdrop. */
export const MODAL_OVERLAY =
  "fixed inset-0 z-50 flex items-center justify-center " +
  "bg-black/60 backdrop-blur-sm";

/** Mac-style modal window. */
export const MODAL_WINDOW =
  "relative flex max-h-[85vh] w-full max-w-[800px] flex-col " +
  "overflow-hidden rounded-xl border border-white/10 " +
  "bg-[#0d0d18]/95 shadow-2xl backdrop-blur-xl";

/** Mac-style title bar (traffic lights). */
export const MODAL_TITLE_BAR =
  "flex items-center gap-2 border-b border-white/10 " + "bg-white/5 px-4 py-3";

/** Mac traffic light button. */
export const TRAFFIC_LIGHT = "!h-3 !w-3 rounded-full";

/** Modal body (scrollable). */
export const MODAL_BODY = "flex-1 overflow-y-auto p-6";

/** Tech stack badge. */
export const TECH_BADGE =
  "inline-block rounded-md border border-white/10 " +
  "bg-white/5 px-2 py-0.5 font-mono text-xs " +
  "text-[var(--color-fg-muted)]";

/** Project card inside modal/detail. */
export const PROJECT_CARD = "rounded-lg border border-white/10 bg-white/5 p-4";
