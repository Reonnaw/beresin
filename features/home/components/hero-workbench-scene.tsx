"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type ReactNode, useEffect, useRef, useState } from "react";
import type { Group, PerspectiveCamera } from "three";

import { LaptopAssembly } from "@/features/workbench/components/laptop-assembly";
import { useWorkbenchStore } from "@/stores/workbench-store";

/** Radians the model leans toward the cursor at the canvas edge. */
const MAX_TILT = 0.14;
const LG_BREAKPOINT = 1024;

function CursorTilt({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!enabled || !group.current) return;
    // Frame-rate independent easing toward the pointer.
    const ease = 1 - Math.exp(-delta * 4);
    const { rotation } = group.current;
    rotation.y += (state.pointer.x * MAX_TILT - rotation.y) * ease;
    rotation.x += (-state.pointer.y * MAX_TILT * 0.5 - rotation.x) * ease;
  });

  return <group ref={group}>{children}</group>;
}

/** Shifts the rendered frame so the copy never covers the model, without moving the orbit center. */
function FrameOffset() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  useEffect(() => {
    // From lg up the copy sits on the left, so the laptop moves right; below lg the canvas has its own block.
    if (width < LG_BREAKPOINT) return;
    camera.setViewOffset(width, height, -width * 0.2, 0, width, height);
    return () => camera.clearViewOffset();
  }, [camera, width, height]);

  return null;
}

export default function HeroWorkbenchScene() {
  const selectModule = useWorkbenchStore((s) => s.selectModule);
  // Client-only module (loaded with ssr: false), so matchMedia is safe in the initializer.
  const [finePointer] = useState(() => matchMedia("(pointer: fine)").matches);
  const [reducedMotion] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);

  return (
    <Canvas
      camera={{ position: [4.2, 3.4, 5.2], fov: 38 }}
      dpr={[1, 1.5]}
      onPointerMissed={() => selectModule(null)}
    >
      <color attach="background" args={["#F5F4F0"]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} />
      <gridHelper args={[16, 32, "#D8D6CE", "#ECEAE2"]} position-y={-0.001} />

      <CursorTilt enabled={finePointer && !reducedMotion}>
        <LaptopAssembly />
      </CursorTilt>
      <FrameOffset />

      {/* OrbitControls locks touch-action on the canvas, which would trap page scroll on phones. */}
      {finePointer && (
        <OrbitControls
          makeDefault
          target={[0, 0.5, 0]}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
      )}
    </Canvas>
  );
}
