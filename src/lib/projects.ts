/**
 * projects.ts
 * Shared project dataset. Replace this stub with Astro content
 * collections or an API fetch when ready.
 */
import type { Project } from "@components/dom/desktop/DesktopProjectGrid.astro";

export const projects: Project[] = [
  { slug: "aurora", title: "Aurora", category: "WebGL", year: 2025, cover: "/fallback/aurora.jpg" },
  { slug: "helix", title: "Helix", category: "3D", year: 2025, cover: "/fallback/helix.jpg" },
  { slug: "tessera", title: "Tessera", category: "WebGL", year: 2024, cover: "/fallback/tessera.jpg" },
  { slug: "nimbus", title: "Nimbus", category: "Motion", year: 2024, cover: "/fallback/nimbus.jpg" },
];
