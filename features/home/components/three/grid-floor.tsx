"use client";

import { Grid } from "@react-three/drei";

import { STAGE_PALETTE } from "@/features/home/data/stage-palette";

/** Endless perspective grid that fades into the stage background, giving the pedestal depth. */
export function GridFloor() {
  return (
    <Grid
      infiniteGrid
      position-y={-0.001}
      cellSize={0.5}
      cellThickness={0.6}
      cellColor={STAGE_PALETTE.gridCell}
      sectionSize={2.5}
      sectionThickness={1}
      sectionColor={STAGE_PALETTE.gridMajor}
      fadeDistance={30}
      fadeStrength={1.6}
    />
  );
}
