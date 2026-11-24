import type { CSSProperties } from "react";

/** Staggers an .intro, .reveal or .reveal-wipe element: step n starts after step n - 1. */
export function motionStep(step: number): CSSProperties {
  return { "--motion-step": step } as CSSProperties;
}
