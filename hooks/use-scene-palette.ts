"use client";

import { useMemo } from "react";

import type { ResolvedTheme } from "@/components/theme/theme-config";
import { useResolvedTheme } from "@/components/theme/theme-store";

/** Scene colors live in app/globals.css as --scene-* tokens; this maps each to its key here. */
const SCENE_TOKENS = {
  background: "--scene-background",
  grid: "--scene-grid",
  gridMajor: "--scene-grid-major",
  pedestal: "--scene-pedestal",
  ring: "--scene-ring",
  ringSecondary: "--scene-ring-secondary",
  chassis: "--scene-chassis",
  chassisTrim: "--scene-chassis-trim",
  edge: "--scene-edge",
  highlight: "--scene-highlight",
  select: "--scene-select",
  fault: "--scene-fault",
} as const;

type SceneColors = Record<keyof typeof SCENE_TOKENS, string>;

/** Intensities are numbers, not colors, so they live here: a dark room needs less fill and more rim. */
const LIGHTING = {
  light: { ambient: 0.9, key: 1.5, rim: 0.35 },
  dark: { ambient: 0.45, key: 1.8, rim: 0.8 },
} as const satisfies Record<ResolvedTheme, { ambient: number; key: number; rim: number }>;

type ScenePalette = SceneColors & { lighting: (typeof LIGHTING)[ResolvedTheme] };

function readSceneColors(): SceneColors {
  const style = getComputedStyle(document.documentElement);
  const entries = Object.entries(SCENE_TOKENS).map(([key, token]) => [key, style.getPropertyValue(token).trim()]);
  return Object.fromEntries(entries) as SceneColors;
}

/**
 * Theme-aware colors and light levels for three.js materials, which cannot read CSS
 * variables themselves. Client-only: call it inside canvases loaded with ssr: false.
 */
export function useScenePalette(): ScenePalette {
  const theme = useResolvedTheme();
  // The resolved theme is already on <html> when it changes, so the computed tokens are current.
  return useMemo(() => ({ ...readSceneColors(), lighting: LIGHTING[theme] }), [theme]);
}
