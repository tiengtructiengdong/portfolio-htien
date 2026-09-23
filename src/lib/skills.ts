/**
 * skills.ts
 * Types and data loader for the skills feature.
 * Data is stored in `src/data/skills.json`.
 */

import skillsData from "../data/skills.json";

// ---- Types -----------------------------------------------------------------

export interface Skill {
  name: string;
  /** Proficiency, clamped to the range [0, 1]. */
  efficiency: number;
  /** Unix timestamp (ms) marking when experience began. */
  experienced_since: number;
  /** Hex color used to render the efficiency bar. */
  color: string;
  /** Free-form notes shown on hover (desktop) / tap (mobile). */
  extra_notes: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// ---- Data -------------------------------------------------------------------

export const skillCategories: SkillCategory[] = skillsData as SkillCategory[];

// ---- Helpers ----------------------------------------------------------------

/**
 * Compute the number of full years since the given timestamp to now.
 * e.g. 1483228800000 (2017-01-01) from 2026-09-23 → 9
 */
export function formatExperiencedSince(timestamp: number): number {
  const now = Date.now();
  const diffMs = now - timestamp;
  const years = diffMs / (365.25 * 24 * 60 * 60 * 1000);
  return Math.max(0, Math.floor(years));
}
