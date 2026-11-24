"use client";

import { STAGE_PALETTE } from "@/features/home/data/stage-palette";

/** Height of the pedestal's top face, where the laptop sits. */
export const PEDESTAL_TOP = 0.3;
const RADIUS = 2.4;

/** Round plinth with a lit orange ring, the focal point the floating parts orbit. */
export function Pedestal() {
  return (
    <group>
      <mesh position-y={PEDESTAL_TOP / 2}>
        <cylinderGeometry args={[RADIUS, RADIUS + 0.15, PEDESTAL_TOP, 64]} />
        <meshStandardMaterial color={STAGE_PALETTE.pedestal} roughness={0.45} metalness={0.5} />
      </mesh>
      {/* toneMapped off keeps the ring at full orange instead of washing it toward white. */}
      <mesh position-y={PEDESTAL_TOP} rotation-x={-Math.PI / 2}>
        <torusGeometry args={[RADIUS - 0.12, 0.04, 16, 128]} />
        <meshBasicMaterial color={STAGE_PALETTE.ring} toneMapped={false} />
      </mesh>
      <mesh position-y={PEDESTAL_TOP + 0.002} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.55, 1.57, 96]} />
        <meshBasicMaterial color={STAGE_PALETTE.signal} transparent opacity={0.45} />
      </mesh>
      {/* Light spill on the floor around the base. */}
      <mesh position-y={0.002} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[RADIUS + 0.15, RADIUS + 1.1, 96]} />
        <meshBasicMaterial color={STAGE_PALETTE.ring} transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <pointLight position={[0, 0.6, 2.6]} color={STAGE_PALETTE.ring} intensity={4} distance={6} />
    </group>
  );
}
