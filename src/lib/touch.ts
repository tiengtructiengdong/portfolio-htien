/**
 * touch.ts
 * Mobile touch gesture & device-orientation listeners.
 */

export interface TouchState {
  /** Active touch count (0-2). */
  touches: number;
  /** Last primary touch X. */
  x: number;
  /** Last primary touch Y. */
  y: number;
  /** Pinch delta (distance between two fingers), 1 if single/none. */
  pinch: number;
  /** Tilt gamma in degrees [-90, 90] (left/right). */
  gamma: number;
  /** Tilt beta in degrees [-180, 180] (front/back). */
  beta: number;
}

export function createTouchState(): TouchState {
  return { touches: 0, x: 0, y: 0, pinch: 1, gamma: 0, beta: 0 };
}

export function attachTouch(
  state: TouchState,
  onUpdate?: (s: TouchState) => void,
): () => void {
  const onStart = (e: TouchEvent): void => {
    state.touches = e.touches.length;
    if (e.touches[0]) {
      state.x = e.touches[0].clientX;
      state.y = e.touches[0].clientY;
    }
    onUpdate?.(state);
  };

  const onMove = (e: TouchEvent): void => {
    state.touches = e.touches.length;
    if (e.touches[0]) {
      state.x = e.touches[0].clientX;
      state.y = e.touches[0].clientY;
    }
    if (e.touches.length >= 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      state.pinch = Math.hypot(dx, dy);
    } else {
      state.pinch = 1;
    }
    onUpdate?.(state);
  };

  const onEnd = (e: TouchEvent): void => {
    state.touches = e.touches.length;
    onUpdate?.(state);
  };

  const onOrientation = (e: DeviceOrientationEvent): void => {
    state.gamma = e.gamma ?? 0;
    state.beta = e.beta ?? 0;
    onUpdate?.(state);
  };

  window.addEventListener("touchstart", onStart, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchend", onEnd, { passive: true });
  window.addEventListener("deviceorientation", onOrientation, { passive: true });

  return (): void => {
    window.removeEventListener("touchstart", onStart);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", onEnd);
    window.removeEventListener("deviceorientation", onOrientation);
  };
}

/**
 * Request iOS device-orientation permission. Resolves true if granted.
 */
export async function requestOrientationPermission(): Promise<boolean> {
  const ctor = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<"granted" | "denied">;
  };
  if (typeof ctor.requestPermission === "function") {
    try {
      return (await ctor.requestPermission()) === "granted";
    } catch {
      return false;
    }
  }
  return true;
}
