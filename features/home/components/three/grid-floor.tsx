"use client";

import { Grid } from "@react-three/drei";

import { useScenePalette } from "@/hooks/use-scene-palette";

/** Endless perspective grid that fades into the scene background, giving the pedestal depth. */
export function GridFloor() {
  const palette = useScenePalette();

  return (
    <Grid
      infiniteGrid
      position-y={-0.001}
      cellSize={0.5}
      cellThickness={0.6}
      cellColor={palette.grid}
      sectionSize={2.5}
      sectionThickness={1}
      sectionColor={palette.gridMajor}
      fadeDistance={30}
      fadeStrength={1.6}
    />
  );
}
