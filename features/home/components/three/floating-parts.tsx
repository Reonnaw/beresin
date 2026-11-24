"use client";

import { Float, Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { type Group, MathUtils } from "three";

import { type FloatingModule, HARDWARE_PARTS } from "@/features/home/components/three/hardware-parts";
import { HOME_MODULES } from "@/features/home/data/home-content";
import type { Vec3 } from "@/features/workbench/lib/module-layout";

/** Where each part hangs around the pedestal, tilted so its most telling face shows. */
const FLOATING_PARTS: { type: FloatingModule; position: Vec3; rotation: Vec3 }[] = [
  { type: "ram", position: [-3.4, 2.6, 0.2], rotation: [0.9, 0.5, -0.4] },
  { type: "expansion_card", position: [-1.9, 3.6, -1.4], rotation: [0.5, 0.7, 0.4] },
  { type: "motherboard", position: [1.8, 3.7, -1.8], rotation: [0.9, -0.4, 0.15] },
  { type: "ssd", position: [3.4, 2.5, -0.2], rotation: [0.8, -0.6, 0.5] },
  { type: "fan", position: [3.6, 1.0, 1.5], rotation: [0.7, -0.4, -0.2] },
  { type: "battery", position: [-3.6, 0.9, 1.7], rotation: [0.6, 0.5, 0.15] },
  { type: "keyboard", position: [2.2, 0.55, 3.0], rotation: [0.25, 0.4, -0.2] },
];

/** Pixels of pointer travel past which a release is an orbit drag, not a click. */
const CLICK_SLOP = 6;

type FloatingPartProps = {
  type: FloatingModule;
  position: Vec3;
  rotation: Vec3;
  animate: boolean;
  selected: boolean;
  onSelect: (type: FloatingModule) => void;
};

function FloatingPart({ type, position, rotation, animate, selected, onSelect }: FloatingPartProps) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const scaler = useRef<Group>(null);
  const Part = HARDWARE_PARTS[type];
  const active = hovered || selected;
  const content = HOME_MODULES[type];

  useFrame((_, delta) => {
    if (!scaler.current) return;
    scaler.current.scale.setScalar(MathUtils.damp(scaler.current.scale.x, active ? 1.15 : 1, 8, delta));
  });

  return (
    <Float
      enabled={animate}
      position={position}
      speed={1.4}
      rotationIntensity={0.5}
      floatIntensity={0.9}
      floatingRange={[-0.12, 0.12]}
    >
      <group
        ref={scaler}
        rotation={rotation}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          if (event.delta <= CLICK_SLOP) onSelect(type);
        }}
      >
        <Part active={active} animate={animate} />
      </group>
      {active && (
        <Html center position={[0, 0.6, 0]} className="pointer-events-none">
          <span className="block whitespace-nowrap rounded-[4px] border border-border bg-surface px-2 py-1 font-mono text-xs text-foreground">
            {content.name} <span className="text-signal">{content.skuPrefix}</span>
          </span>
        </Html>
      )}
    </Float>
  );
}

type FloatingPartsProps = {
  animate: boolean;
  selected: FloatingModule | null;
  onSelect: (type: FloatingModule) => void;
};

/** RAM, SSD, battery, fan, expansion card, mainboard and keycaps hovering around the pedestal. */
export function FloatingParts({ animate, selected, onSelect }: FloatingPartsProps) {
  return FLOATING_PARTS.map((part) => (
    <FloatingPart
      key={part.type}
      {...part}
      animate={animate}
      selected={selected === part.type}
      onSelect={onSelect}
    />
  ));
}
