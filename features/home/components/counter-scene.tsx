"use client";

import { Bounds, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

import { CursorTilt } from "@/features/home/components/three/cursor-tilt";
import { LaptopAssembly } from "@/features/workbench/components/laptop-assembly";
import { useWorkbenchStore } from "@/stores/workbench-store";

export default function CounterScene() {
  const selectModule = useWorkbenchStore((s) => s.selectModule);
  // Client-only module (loaded with ssr: false), so matchMedia is safe in the initializer.
  const [finePointer] = useState(() => matchMedia("(pointer: fine)").matches);
  const [reducedMotion] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);

  return (
    <Canvas
      camera={{ position: [4, 3.4, 5], fov: 36 }}
      dpr={[1, 1.5]}
      onPointerMissed={() => selectModule(null)}
    >
      <color attach="background" args={["#F5F4F0"]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} />
      {/* Same cutting mat as the workbench, so the two views read as one bench. */}
      <gridHelper args={[16, 32, "#D8D6CE", "#ECEAE2"]} position-y={-0.001} />

      {/* Fits the whole laptop to the canvas at every size; a near-zero duration snaps instead of flying in. */}
      <Bounds fit clip observe margin={1.15} maxDuration={0.001}>
        <CursorTilt enabled={finePointer && !reducedMotion}>
          <LaptopAssembly />
        </CursorTilt>
      </Bounds>

      {/* OrbitControls locks touch-action on the canvas, which would trap page scroll on phones. */}
      {finePointer && (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
      )}
    </Canvas>
  );
}
