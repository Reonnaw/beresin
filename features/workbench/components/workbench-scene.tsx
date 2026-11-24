"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { SceneLights } from "@/components/three/scene-lights";
import { LaptopAssembly } from "@/features/workbench/components/laptop-assembly";
import { useScenePalette } from "@/hooks/use-scene-palette";
import { useWorkbenchStore } from "@/stores/workbench-store";

/** Cutting-mat grid in the same tokens as the homepage floor. */
function BenchGrid() {
  const palette = useScenePalette();
  return <gridHelper args={[12, 24, palette.gridMajor, palette.grid]} position-y={-0.001} />;
}

export default function WorkbenchScene() {
  const selectModule = useWorkbenchStore((s) => s.selectModule);

  return (
    <Canvas
      camera={{ position: [3.6, 3.2, 4.4], fov: 40 }}
      dpr={[1, 2]}
      onPointerMissed={() => selectModule(null)}
    >
      <SceneLights />
      <BenchGrid />

      <LaptopAssembly />

      <OrbitControls
        makeDefault
        target={[0, 0.5, 0]}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
    </Canvas>
  );
}
