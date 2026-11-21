import type { ModuleType } from "@/types/domain";

export type Vec3 = [number, number, number];

type ModulePart = {
  position: Vec3;
  size: Vec3;
  rotation?: Vec3;
};

type ModuleLayout = {
  color: string;
  /** Offset per unit of explode, scaled by EXPLODE_DISTANCE. */
  direction: Vec3;
  /** Parts at negative X move with direction X flipped, so they exit their own side. */
  mirrorX?: boolean;
  parts: ModulePart[];
};

/** Seeded laptop series the procedural model represents. */
export const WORKBENCH_MODEL_SLUG = "modular-13";

/** World units a module travels at explode = 1 along a direction of length 1. */
export const EXPLODE_DISTANCE = 1.2;

/** Bottom cover is the fixed frame every module docks into, so it never explodes. */
export const CHASSIS: ModulePart = { position: [0, 0.02, 0], size: [3, 0.04, 2.1] };

/*
 * Procedural stand-in for a modular 13" laptop, Y up, front edge at +Z.
 * shortcut: boxes instead of a GLB, swap for laptop_models.model_url once assets exist.
 */
export const MODULE_LAYOUT: Record<ModuleType, ModuleLayout> = {
  screen: {
    color: "#3A3D42",
    direction: [0, 0.5, -1],
    // Hinge at the back edge, lid tilted 0.25 rad past vertical.
    parts: [{ position: [0, 1.11, -1.235], size: [2.9, 1.9, 0.05], rotation: [-0.25, 0, 0] }],
  },
  keyboard: {
    color: "#C9C7C0",
    direction: [0, 1.6, 0],
    parts: [{ position: [0, 0.18, 0], size: [2.9, 0.04, 2] }],
  },
  battery: {
    color: "#5C6068",
    direction: [0, 0.6, 1],
    parts: [{ position: [0, 0.075, 0.55], size: [2.4, 0.07, 0.7] }],
  },
  fan: {
    color: "#8A8D93",
    direction: [-0.6, 1, -0.4],
    parts: [{ position: [-0.9, 0.11, -0.5], size: [0.6, 0.08, 0.6] }],
  },
  ssd: {
    color: "#2B2D31",
    direction: [0.2, 1, 0.3],
    parts: [{ position: [0.25, 0.08, -0.15], size: [0.55, 0.02, 0.18] }],
  },
  ram: {
    color: "#4A4F57",
    direction: [0.6, 1, -0.2],
    parts: [
      { position: [0.95, 0.08, -0.25], size: [0.6, 0.02, 0.22] },
      { position: [0.95, 0.08, -0.55], size: [0.6, 0.02, 0.22] },
    ],
  },
  expansion_card: {
    color: "#A9ABAF",
    direction: [1, 0, 0],
    mirrorX: true,
    parts: [
      { position: [1.38, 0.1, 0.2], size: [0.3, 0.1, 0.28] },
      { position: [1.38, 0.1, -0.25], size: [0.3, 0.1, 0.28] },
      { position: [-1.38, 0.1, 0.2], size: [0.3, 0.1, 0.28] },
      { position: [-1.38, 0.1, -0.25], size: [0.3, 0.1, 0.28] },
    ],
  },
  motherboard: {
    color: "#3C4650",
    direction: [0, 0.3, 0],
    parts: [{ position: [0, 0.055, -0.35], size: [2.6, 0.03, 1.2] }],
  },
};

export function explodeOffset(layout: ModuleLayout, part: ModulePart, explode: number): Vec3 {
  const { direction } = layout;
  const side = layout.mirrorX && part.position[0] < 0 ? -1 : 1;
  const scale = explode * EXPLODE_DISTANCE;
  return [direction[0] * side * scale, direction[1] * scale, direction[2] * scale];
}
