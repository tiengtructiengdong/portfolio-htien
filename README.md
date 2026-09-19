# portfolio-htien

Astro + React (`@astrojs/react`) portfolio with device-specific rendering.

- **Desktop** — R3F WebGL canvas, GPU cursor follower, multi-column grid.
- **Mobile** — lightweight 2D WebGL canvas, gyroscope-aware, single-column touch UI.
- **Shared** — interactive islands hydrate on both.

## Stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | Astro 4 (`strict` TS preset)             |
| UI islands     | `@astrojs/react` + React 18 (TypeScript) |
| 3D             | `three` + `@react-three/fiber` + `drei` |
| Config         | `astro.config.ts` (no vanilla JS)        |

## Scripts

```sh
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## Structure highlights

```
src/
├── components/
│   ├── dom/           # Zero-JS Astro components (server-rendered)
│   └── islands/       # Hydrated React (.tsx) — client:only / client:load
├── layouts/           # BaseLayout + Desktop/Mobile shells
├── lib/               # Pure TS: pointer, touch, viewport helpers
├── pages/             # index.astro + work/[slug].astro
├── shaders/           # .frag GLSL, imported as strings (see env.d.ts)
└── styles/            # global / desktop / mobile CSS
```

## Conditional hydration

`index.astro` renders **both** desktop and mobile shells. CSS media queries
hide the inactive one; islands hydrate with the appropriate directive:

- `client:only="react"` for WebGL/Canvas components (they need `window`/WebGL).
- `client:load` for UI controls (ProjectFilter, MobileNavigation).

## TypeScript

The project extends `astro/tsconfigs/strict`. All code is TypeScript —
`.astro`, `.tsx`, `.ts`. Shaders (`.frag`) are typed via `src/env.d.ts`.
