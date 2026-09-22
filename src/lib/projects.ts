/**
 * projects.ts
 * Shared project dataset. Replace this stub with Astro content
 * collections or an API fetch when ready.
 */
import type { Project } from "@components/dom/desktop/DesktopProjectGrid.astro";

export const projects: Project[] = [
  {
    slug: "aurora",
    title: "Aurora",
    category: "WebGL",
    year: 2025,
    cover:
      "https://preview.redd.it/macos-golden-gate-background-for-anyone-that-wants-it-v0-yzfjy05hyi6h1.jpeg?width=640&crop=smart&auto=webp&s=5aa6ff78411dc1fe72381fc78ec7d218c30d434d",
  },
  {
    slug: "helix",
    title: "Helix",
    category: "3D",
    year: 2025,
    cover: "/fallback/helix.jpg",
  },
  {
    slug: "tessera",
    title: "Tessera",
    category: "WebGL",
    year: 2024,
    cover: "/fallback/tessera.jpg",
  },
  {
    slug: "nimbus",
    title: "Nimbus",
    category: "Motion",
    year: 2024,
    cover: "/fallback/nimbus.jpg",
  },
];
