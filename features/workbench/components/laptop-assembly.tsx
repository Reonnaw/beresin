"use client";

import { Edges } from "@react-three/drei";

import { LaptopModule } from "@/features/workbench/components/laptop-module";
import { CHASSIS } from "@/features/workbench/lib/module-layout";
import { MODULE_TYPES } from "@/lib/constants/modules";
import { useWorkbenchStore } from "@/stores/workbench-store";

/** Chassis plus every visible module, shared by the workbench and the homepage hero. */
export function LaptopAssembly() {
  const hiddenModules = useWorkbenchStore((s) => s.hiddenModules);

  return (
    <>
      <mesh position={CHASSIS.position}>
        <boxGeometry args={CHASSIS.size} />
        <meshStandardMaterial color="#B8B6AE" roughness={0.7} metalness={0.2} />
        <Edges color="#1A1B1E" />
      </mesh>
      {MODULE_TYPES.filter((type) => !hiddenModules.includes(type)).map((type) => (
        <LaptopModule key={type} type={type} />
      ))}
    </>
  );
}
