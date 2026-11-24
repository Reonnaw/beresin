"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type ComponentType, useRef } from "react";
import { DoubleSide, type Group } from "three";

import { STAGE_PALETTE } from "@/features/home/data/stage-palette";
import type { ModuleType } from "@/types/domain";

export type PartProps = {
  /** Hovered or selected: the body glows signal cyan. */
  active: boolean;
  /** False under prefers-reduced-motion; only parts with moving pieces read it. */
  animate: boolean;
};

/** Modules shown floating around the pedestal. The screen is the laptop itself. */
export type FloatingModule = Exclude<ModuleType, "screen">;

function Body({ color, active, metalness = 0.3 }: { color: string; active: boolean; metalness?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={STAGE_PALETTE.signal}
      emissiveIntensity={active ? 0.45 : 0}
      roughness={0.5}
      metalness={metalness}
    />
  );
}

function Chip({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={STAGE_PALETTE.chip} roughness={0.7} />
    </mesh>
  );
}

function RamStick({ active }: PartProps) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.3, 0.04, 0.4]} />
        <Body color={STAGE_PALETTE.pcb} active={active} />
      </mesh>
      {[-0.42, -0.14, 0.14, 0.42].map((x) => (
        <Chip key={x} position={[x, 0.035, -0.02]} size={[0.22, 0.03, 0.24]} />
      ))}
      <mesh position={[0, 0, 0.19]}>
        <boxGeometry args={[1.2, 0.045, 0.04]} />
        <meshStandardMaterial color={STAGE_PALETTE.gold} metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function NvmeSsd({ active }: PartProps) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.1, 0.03, 0.26]} />
        <Body color={STAGE_PALETTE.pcb} active={active} />
      </mesh>
      <Chip position={[-0.3, 0.03, 0]} size={[0.2, 0.03, 0.2]} />
      <Chip position={[0.05, 0.03, 0]} size={[0.3, 0.03, 0.2]} />
      <Chip position={[0.38, 0.03, 0]} size={[0.24, 0.03, 0.2]} />
      {/* Label sticker with an orange band, as on retail drives. */}
      <mesh position={[0.05, 0.047, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color={STAGE_PALETTE.label} />
      </mesh>
      <mesh position={[0.05, 0.048, -0.06]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.3, 0.04]} />
        <meshBasicMaterial color={STAGE_PALETTE.ring} toneMapped={false} />
      </mesh>
      <mesh position={[-0.53, 0, 0]}>
        <boxGeometry args={[0.04, 0.032, 0.22]} />
        <meshStandardMaterial color={STAGE_PALETTE.gold} metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function BatteryPack({ active }: PartProps) {
  return (
    <group>
      <RoundedBox args={[1.3, 0.14, 0.6]} radius={0.03}>
        <Body color="#262D3B" active={active} />
      </RoundedBox>
      {/* Seams between the four cells. */}
      {[-0.325, 0, 0.325].map((x) => (
        <mesh key={x} position={[x, 0.071, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[0.012, 0.56]} />
          <meshBasicMaterial color={STAGE_PALETTE.chassisEdge} />
        </mesh>
      ))}
      <mesh position={[0.4, 0.04, 0.33]}>
        <boxGeometry args={[0.16, 0.06, 0.08]} />
        <meshBasicMaterial color={STAGE_PALETTE.ring} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CoolingFan({ active, animate }: PartProps) {
  const rotor = useRef<Group>(null);
  useFrame((_, delta) => {
    if (animate && rotor.current) rotor.current.rotation.y += delta * 6;
  });

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.42, 0.42, 0.12, 48, 1, true]} />
        <Body color="#2A3140" active={active} metalness={0.5} />
      </mesh>
      <mesh position-y={-0.06} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.42, 48]} />
        <meshStandardMaterial color="#1B2130" side={DoubleSide} />
      </mesh>
      <group ref={rotor}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 24]} />
          <meshStandardMaterial color={STAGE_PALETTE.metal} metalness={0.8} roughness={0.3} />
        </mesh>
        {Array.from({ length: 9 }, (_, index) => (
          <group key={index} rotation-y={(index / 9) * Math.PI * 2}>
            <mesh position-z={0.25} rotation-y={0.35}>
              <boxGeometry args={[0.02, 0.08, 0.24]} />
              <meshStandardMaterial color={STAGE_PALETTE.metal} metalness={0.6} roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>
      {/* Copper heatsink and heat pipe off the outlet. */}
      <group position={[0.68, 0, 0.2]}>
        {Array.from({ length: 8 }, (_, index) => (
          <mesh key={index} position-x={-0.14 + index * 0.04}>
            <boxGeometry args={[0.015, 0.1, 0.3]} />
            <meshStandardMaterial color={STAGE_PALETTE.copper} metalness={0.85} roughness={0.3} />
          </mesh>
        ))}
      </group>
      <mesh position={[0.2, 0.02, 0.36]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.025, 0.025, 0.8, 12]} />
        <meshStandardMaterial color={STAGE_PALETTE.copper} metalness={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
}

function ExpansionCard({ active }: PartProps) {
  return (
    <group>
      <RoundedBox args={[0.34, 0.22, 0.56]} radius={0.04}>
        <Body color={STAGE_PALETTE.metal} active={active} metalness={0.8} />
      </RoundedBox>
      {/* USB-C port on the outer face. */}
      <RoundedBox args={[0.16, 0.06, 0.02]} radius={0.025} position={[0, 0, 0.28]}>
        <meshStandardMaterial color={STAGE_PALETTE.chip} />
      </RoundedBox>
      <mesh position={[0.171, 0, 0]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[0.4, 0.04]} />
        <meshBasicMaterial color={STAGE_PALETTE.ring} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Mainboard({ active }: PartProps) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.5, 0.04, 0.9]} />
        <Body color={STAGE_PALETTE.pcb} active={active} />
      </mesh>
      {/* CPU: silver lid on a dark package. */}
      <Chip position={[-0.3, 0.035, -0.05]} size={[0.38, 0.03, 0.38]} />
      <mesh position={[-0.3, 0.06, -0.05]}>
        <boxGeometry args={[0.26, 0.02, 0.26]} />
        <meshStandardMaterial color={STAGE_PALETTE.metal} metalness={0.9} roughness={0.25} />
      </mesh>
      <Chip position={[0.25, 0.03, -0.25]} size={[0.18, 0.02, 0.18]} />
      <Chip position={[0.5, 0.03, -0.25]} size={[0.14, 0.02, 0.14]} />
      {/* SO-DIMM and M.2 slots */}
      <mesh position={[0.35, 0.035, 0.2]}>
        <boxGeometry args={[0.7, 0.03, 0.06]} />
        <meshStandardMaterial color={STAGE_PALETTE.chip} />
      </mesh>
      <mesh position={[0.35, 0.035, 0.34]}>
        <boxGeometry args={[0.7, 0.03, 0.06]} />
        <meshStandardMaterial color={STAGE_PALETTE.chip} />
      </mesh>
      {[-0.6, -0.5, -0.4].map((x) => (
        <mesh key={x} position={[x, 0.05, 0.33]}>
          <cylinderGeometry args={[0.03, 0.03, 0.06, 12]} />
          <meshStandardMaterial color={STAGE_PALETTE.metal} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Keycap({ color, active, position }: { color: string; active: boolean; position: [number, number, number] }) {
  // Four-sided frustum rotated 45° reads as a sculpted keycap.
  return (
    <mesh position={position} rotation-y={Math.PI / 4}>
      <cylinderGeometry args={[0.17, 0.24, 0.16, 4]} />
      <Body color={color} active={active} metalness={0.1} />
    </mesh>
  );
}

function Keycaps({ active }: PartProps) {
  return (
    <group>
      <Keycap color={STAGE_PALETTE.ring} active={active} position={[0, 0, 0]} />
      <Keycap color="#262D3B" active={active} position={[0.38, -0.05, 0.08]} />
      <Keycap color={STAGE_PALETTE.label} active={active} position={[-0.2, -0.12, 0.34]} />
    </group>
  );
}

export const HARDWARE_PARTS = {
  ram: RamStick,
  ssd: NvmeSsd,
  battery: BatteryPack,
  fan: CoolingFan,
  expansion_card: ExpansionCard,
  motherboard: Mainboard,
  keyboard: Keycaps,
} as const satisfies Record<FloatingModule, ComponentType<PartProps>>;
