"use client";

import { useScenePalette } from "@/hooks/use-scene-palette";

/** Background, fill, key and a cobalt rim, shared by every canvas so they light the same in each theme. */
export function SceneLights() {
  const palette = useScenePalette();
  const { ambient, key, rim } = palette.lighting;

  return (
    <>
      <color attach="background" args={[palette.background]} />
      <ambientLight intensity={ambient} />
      <directionalLight position={[4, 8, 5]} intensity={key} />
      <directionalLight position={[-6, 3, -4]} intensity={rim} color={palette.ringSecondary} />
    </>
  );
}
