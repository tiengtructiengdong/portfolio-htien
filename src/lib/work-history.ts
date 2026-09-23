/**
 * work-history.ts
 * Types and data loader for the work history feature.
 * Data is stored in `src/data/work-history.json`.
 */

import workHistoryData from "../data/work-history.json";

// ---- Types -----------------------------------------------------------------

export interface CompanyProject {
  name: string;
  tech_stack: string[];
  problem_solved: string;
  url?: string;
}

export interface WorkHistoryEntry {
  company_name: string;
  slug: string;
  date_from: string; // ISO month, e.g. "2023-06"
  date_to: string; // ISO month, e.g. "2025-09"
  url?: string;
  image_url?: string;
  projects: CompanyProject[];
}

// ---- Data -------------------------------------------------------------------

export const workHistory: WorkHistoryEntry[] =
  workHistoryData as WorkHistoryEntry[];

// ---- Helpers ----------------------------------------------------------------

/**
 * Find a single work history entry by its slug.
 * Returns `undefined` if not found.
 */
export function getWorkHistoryBySlug(
  slug: string,
): WorkHistoryEntry | undefined {
  return workHistory.find((entry) => entry.slug === slug);
}

/**
 * Format an ISO month string ("2023-06") into a human-readable label.
 * e.g. "2023-06" → "Jun 2023"
 */
export function formatMonth(iso: string): string {
  const [yearStr, monthStr] = iso.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const date = new Date(year, month);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Format a date range from two ISO month strings.
 * e.g. "2023-06", "2025-09" → "Jun 2023 — Sep 2025"
 */
export function formatDateRange(from: string, to: string): string {
  return `${formatMonth(from)} — ${formatMonth(to)}`;
}