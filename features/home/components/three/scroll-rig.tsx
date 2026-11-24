"use client";

import { useFrame } from "@react-three/fiber";
import { type ReactNode, type RefObject, useRef } from "react";
import { type Group, MathUtils } from "three";

/** Radians the stage turns over one screen of scrolling. */
const TURN = 0.9;

/**
 * Turns its children as the page scrolls and writes the eased scroll progress (0 with
 * the hero at the top, 1 one screen further down) into `progressRef` for parts that react too.
 * Reads window.scrollY per frame instead of a scroll listener, so it never re-renders React.
 */
export function ScrollRig({
  progressRef,
  enabled,
  children,
}: {
  progressRef: RefObject<number>;
  enabled: boolean;
  children: ReactNode;
}) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const target = enabled ? MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1) : 0;
    progressRef.current = MathUtils.damp(progressRef.current, target, 5, delta);
    if (group.current) group.current.rotation.y = progressRef.current * TURN;
  });

  return <group ref={group}>{children}</group>;
}
