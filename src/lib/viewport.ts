/**
 * viewport.ts
 * Media query breakpoint state helpers. Keep the numeric
 * breakpoints in sync with `global.css` `--bp-*` tokens.
 */

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export interface ViewportState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const DEFAULT_STATE: ViewportState = {
  isMobile: true,
  isTablet: false,
  isDesktop: false,
};

/**
 * Synchronously reads the current viewport category.
 * Falls back to mobile state during SSR (no `window`).
 */
export function readViewport(): ViewportState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  const w = window.innerWidth;
  return {
    isMobile: w < BREAKPOINTS.tablet,
    isTablet: w >= BREAKPOINTS.tablet && w < BREAKPOINTS.desktop,
    isDesktop: w >= BREAKPOINTS.desktop,
  };
}

/**
 * Subscribe to viewport changes. Invokes `cb` with the new state.
 * Returns a disposer.
 */
export function subscribeViewport(cb: (s: ViewportState) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.desktop}px)`);
  const handler = (): void => cb(readViewport());
  mql.addEventListener("change", handler);
  return (): void => mql.removeEventListener("change", handler);
}
