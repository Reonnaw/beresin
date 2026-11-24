"use client";

import { Instance, Instances, RoundedBox } from "@react-three/drei";

import { STAGE_PALETTE } from "@/features/home/data/stage-palette";

const WIDTH = 2.6;
const DEPTH = 1.8;
const BASE_HEIGHT = 0.1;
const LID_HEIGHT = 1.7;
/** Radians the lid leans back past vertical. */
const LID_TILT = 0.32;

const KEY_COLUMNS = 12;
const KEY_ROWS = 5;
const KEY_PITCH = 0.17;

const KEYS = Array.from({ length: KEY_COLUMNS * KEY_ROWS }, (_, index) => {
  const column = index % KEY_COLUMNS;
  const row = Math.floor(index / KEY_COLUMNS);
  return [
    (column - (KEY_COLUMNS - 1) / 2) * KEY_PITCH,
    BASE_HEIGHT + 0.01,
    -0.62 + row * KEY_PITCH,
  ] as const;
});

/**
 * Open modular laptop, origin at the center of its underside, front edge at +Z.
 * Drawn from primitives so the hero never depends on a downloaded asset.
 */
export function ProceduralLaptop() {
  return (
    <group>
      <RoundedBox args={[WIDTH, BASE_HEIGHT, DEPTH]} radius={0.03} position-y={BASE_HEIGHT / 2}>
        <meshStandardMaterial color={STAGE_PALETTE.chassis} roughness={0.4} metalness={0.3} />
      </RoundedBox>

      <Instances limit={KEYS.length}>
        <boxGeometry args={[0.14, 0.02, 0.14]} />
        <meshStandardMaterial color={STAGE_PALETTE.chip} roughness={0.8} />
        {KEYS.map((position, index) => (
          <Instance key={index} position={position} />
        ))}
      </Instances>

      {/* Touchpad */}
      <mesh position={[0, BASE_HEIGHT + 0.001, 0.52]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshStandardMaterial color={STAGE_PALETTE.chassisEdge} roughness={0.25} metalness={0.6} />
      </mesh>

      {/* Expansion card bays: the modular trait, two per side, lit in the ring's orange. */}
      {[-1, 1].flatMap((side) =>
        [-0.35, 0.2].map((z) => (
          <mesh key={`${side}${z}`} position={[side * (WIDTH / 2 + 0.001), BASE_HEIGHT / 2, z]} rotation-y={(side * Math.PI) / 2}>
            <planeGeometry args={[0.26, 0.05]} />
            <meshBasicMaterial color={STAGE_PALETTE.ring} toneMapped={false} />
          </mesh>
        )),
      )}

      {/* Lid pivots on the hinge along the back edge. */}
      <group position={[0, BASE_HEIGHT, -DEPTH / 2]} rotation-x={-LID_TILT}>
        <RoundedBox args={[WIDTH, LID_HEIGHT, 0.06]} radius={0.025} position={[0, LID_HEIGHT / 2, -0.03]}>
          <meshStandardMaterial color={STAGE_PALETTE.chassis} roughness={0.4} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, LID_HEIGHT / 2 + 0.03, 0.001]}>
          <planeGeometry args={[WIDTH - 0.16, LID_HEIGHT - 0.2]} />
          <meshStandardMaterial
            color={STAGE_PALETTE.screen}
            emissive={STAGE_PALETTE.signal}
            emissiveIntensity={0.18}
            roughness={0.2}
          />
        </mesh>
        {/* Diagnostic readout lines on the screen. */}
        {[0.45, 0.3, 0.15].map((y, index) => (
          <mesh key={y} position={[-0.45 + index * 0.12, LID_HEIGHT / 2 + y, 0.002]}>
            <planeGeometry args={[1.2 - index * 0.25, 0.05]} />
            <meshBasicMaterial color={index === 0 ? STAGE_PALETTE.ring : STAGE_PALETTE.signal} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
