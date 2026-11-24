"use client";

import { useScenePalette } from "@/hooks/use-scene-palette";

/** Height of the pedestal's top face, where the laptop sits. */
export const PEDESTAL_TOP = 0.3;
const RADIUS = 2.4;

/** Round plinth with a lit accent ring, the focal point the floating parts orbit. */
export function Pedestal() {
  const palette = useScenePalette();

  return (
    <group>
      <mesh position-y={PEDESTAL_TOP / 2}>
        <cylinderGeometry args={[RADIUS, RADIUS + 0.15, PEDESTAL_TOP, 64]} />
        <meshStandardMaterial color={palette.pedestal} roughness={0.45} metalness={0.3} />
      </mesh>
      {/* toneMapped off keeps the ring at the exact token color instead of washing it out. */}
      <mesh position-y={PEDESTAL_TOP} rotation-x={-Math.PI / 2}>
        <torusGeometry args={[RADIUS - 0.12, 0.04, 16, 128]} />
        <meshBasicMaterial color={palette.ring} toneMapped={false} />
      </mesh>
      <mesh position-y={PEDESTAL_TOP + 0.002} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.55, 1.57, 96]} />
        <meshBasicMaterial color={palette.ringSecondary} toneMapped={false} />
      </mesh>
      {/* Light spill on the floor around the base. */}
      <mesh position-y={0.002} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[RADIUS + 0.15, RADIUS + 1.1, 96]} />
        <meshBasicMaterial color={palette.ring} transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <pointLight position={[0, 0.6, 2.6]} color={palette.ring} intensity={4} distance={6} />
    </group>
  );
}
