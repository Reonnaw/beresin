"use client";

import { useFrame } from "@react-three/fiber";
import { type ReactNode, useRef } from "react";
import type { Group } from "three";

/** Radians the model leans toward the cursor at the canvas edge. */
const MAX_TILT = 0.12;

/** Leans its children toward the pointer, easing so the motion stays smooth at any frame rate. */
export function CursorTilt({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!enabled || !group.current) return;
    const ease = 1 - Math.exp(-delta * 4);
    const { rotation } = group.current;
    rotation.y += (state.pointer.x * MAX_TILT - rotation.y) * ease;
    rotation.x += (-state.pointer.y * MAX_TILT * 0.5 - rotation.x) * ease;
  });

  return <group ref={group}>{children}</group>;
}
