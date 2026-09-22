/**
 * CompanyDetailContent.tsx
 * Shared content for a single work history entry.
 * Used in both the desktop modal and the mobile detail page.
 */
import type { WorkHistoryEntry } from "@lib/work-history";
import { formatDateRange } from "@lib/work-history";
import {
  ACCENT_HEADING,
  BODY,
  PERIOD_TEXT,
  PROJECT_CARD,
  TECH_BADGE,
} from "@lib/classes";

export interface CompanyDetailContentProps {
  entry: WorkHistoryEntry;
}

export default function CompanyDetailContent({
  entry,
}: CompanyDetailContentProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header: company name + period */}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className={`${ACCENT_HEADING} text-lg font-semibold`}>
          {entry.company_name}
        </h2>
        <span className={PERIOD_TEXT}>
          {formatDateRange(entry.date_from, entry.date_to)}
        </span>
      </div>

      {/* Company link */}
      {entry.url && (
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
        >
          {entry.url} ↗
        </a>
      )}

      {/* Cover image */}
      {entry.image_url && (
        <img
          src={entry.image_url}
          alt={entry.company_name}
          className="aspect-[16/10] w-full rounded-lg object-cover"
          loading="lazy"
        />
      )}

      {/* Projects */}
      <div className="flex flex-col gap-4">
        <h3 className={ACCENT_HEADING}>Projects</h3>
        {entry.projects.map((project, i) => (
          <div key={i} className={PROJECT_CARD}>
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-mono text-sm font-medium text-[var(--color-fg)]">
                {project.name}
              </h4>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Link ↗
                </a>
              )}
            </div>
            <p className={`${BODY} mb-3`}>{project.problem_solved}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech_stack.map((tech) => (
                <span key={tech} className={TECH_BADGE}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}