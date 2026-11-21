"use client";

import { Edges, useCursor } from "@react-three/drei";
import { useState } from "react";

import { explodeOffset, MODULE_LAYOUT } from "@/features/workbench/lib/module-layout";
import { useDiagnosticStore } from "@/stores/diagnostic-store";
import { useWorkbenchStore } from "@/stores/workbench-store";
import type { ModuleType } from "@/types/domain";

const ACCENT = "#E85D2A";
const DANGER = "#D9383A";
const EDGE = "#1A1B1E";

export function LaptopModule({ type }: { type: ModuleType }) {
  const layout = MODULE_LAYOUT[type];
  const explode = useWorkbenchStore((s) => s.explode);
  const selected = useWorkbenchStore((s) => s.selectedModule === type);
  const selectModule = useWorkbenchStore((s) => s.selectModule);
  const damaged = useDiagnosticStore((s) => s.findings.some((f) => f.moduleType === type));
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group
      name={type}
      onClick={(event) => {
        event.stopPropagation();
        selectModule(type);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {layout.parts.map((part, index) => {
        const [dx, dy, dz] = explodeOffset(layout, part, explode);
        const [x, y, z] = part.position;
        return (
          <mesh key={index} position={[x + dx, y + dy, z + dz]} rotation={part.rotation}>
            <boxGeometry args={part.size} />
            <meshStandardMaterial
              color={damaged ? DANGER : selected ? ACCENT : layout.color}
              emissive={ACCENT}
              emissiveIntensity={hovered && !selected ? 0.25 : 0}
              roughness={0.6}
              metalness={0.2}
            />
            {/* A damaged module is already red, so selection moves to its outline. */}
            <Edges color={selected && damaged ? ACCENT : EDGE} />
          </mesh>
        );
      })}
    </group>
  );
}
