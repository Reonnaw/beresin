"use client";

import { Edges } from "@react-three/drei";

import { LaptopModule } from "@/features/workbench/components/laptop-module";
import { CHASSIS } from "@/features/workbench/lib/module-layout";
import { useScenePalette } from "@/hooks/use-scene-palette";
import { MODULE_TYPES } from "@/lib/constants/modules";
import { useWorkbenchStore } from "@/stores/workbench-store";

/** Chassis plus every visible module on the workbench canvas. */
export function LaptopAssembly() {
  const hiddenModules = useWorkbenchStore((s) => s.hiddenModules);
  const palette = useScenePalette();

  return (
    <>
      <mesh position={CHASSIS.position}>
        <boxGeometry args={CHASSIS.size} />
        <meshStandardMaterial color={palette.chassis} roughness={0.7} metalness={0.2} />
        <Edges color={palette.edge} />
      </mesh>
      {MODULE_TYPES.filter((type) => !hiddenModules.includes(type)).map((type) => (
        <LaptopModule key={type} type={type} />
      ))}
    </>
  );
}
