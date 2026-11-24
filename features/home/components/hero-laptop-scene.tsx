"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useCallback, useLayoutEffect, useState } from "react";
import { MathUtils } from "three";

import { SceneLights } from "@/components/three/scene-lights";
import { PartDetailCard } from "@/features/home/components/part-detail-card";
import { CursorTilt } from "@/features/home/components/three/cursor-tilt";
import { FloatingParts } from "@/features/home/components/three/floating-parts";
import { GridFloor } from "@/features/home/components/three/grid-floor";
import type { FloatingModule } from "@/features/home/components/three/hardware-parts";
import { Pedestal, PEDESTAL_TOP } from "@/features/home/components/three/pedestal";
import { ProceduralLaptop } from "@/features/home/components/three/procedural-laptop";
import { SketchfabLaptop } from "@/features/home/components/three/sketchfab-laptop";
import { useShowcaseModel } from "@/features/home/hooks/use-showcase-model";
import type { Vec3 } from "@/features/workbench/lib/module-layout";

/** Middle of the pedestal-and-parts group: no copy sits on the stage, so the camera aims straight at it. */
const LOOK_AT: Vec3 = [0, 1.9, 0];

/**
 * Pulls the camera back on narrow screens so the side parts stay in frame, up to where they would get too small.
 * Orbit only on fine pointers: OrbitControls locks touch-action on the canvas, which would trap page scroll on phones.
 */
function StageCamera({ orbit }: { orbit: boolean }) {
  const camera = useThree((state) => state.camera);
  const aspect = useThree((state) => state.size.width / state.size.height);

  useLayoutEffect(() => {
    // Wide, short stages can come closer: the parts spread sideways, not up.
    const distance = MathUtils.clamp(12 * Math.sqrt(1.7 / aspect), 8.5, 17);
    camera.position.set(0, distance * 0.36, distance);
    camera.lookAt(...LOOK_AT);
  }, [aspect, camera]);

  if (!orbit) return null;
  return (
    <OrbitControls
      makeDefault
      target={LOOK_AT}
      enablePan={false}
      enableZoom={false}
      minPolarAngle={1}
      maxPolarAngle={1.45}
      minAzimuthAngle={-0.9}
      maxAzimuthAngle={0.9}
    />
  );
}

export default function HeroLaptopScene() {
  const model = useShowcaseModel();
  const [modelReady, setModelReady] = useState(false);
  const [selected, setSelected] = useState<FloatingModule | null>(null);
  // Client-only module (loaded with ssr: false), so matchMedia is safe in the initializer.
  const [finePointer] = useState(() => matchMedia("(pointer: fine)").matches);
  const [reducedMotion] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const animate = !reducedMotion;
  const markReady = useCallback(() => setModelReady(true), []);

  return (
    <div className="relative h-full">
      <Canvas camera={{ fov: 36 }} dpr={[1, 1.75]} onPointerMissed={() => setSelected(null)}>
        <SceneLights />
        <StageCamera orbit={finePointer} />

        <CursorTilt enabled={finePointer && animate}>
          <GridFloor />
          <Pedestal />
          <group position-y={PEDESTAL_TOP}>
            {model ? (
              <SketchfabLaptop url={model.glbUrl} fallback={<ProceduralLaptop />} onReady={markReady} />
            ) : (
              <ProceduralLaptop />
            )}
          </group>
          <FloatingParts animate={animate} selected={selected} onSelect={setSelected} />
        </CursorTilt>
      </Canvas>

      <div aria-live="polite" className="absolute inset-x-4 top-4 z-20 sm:inset-x-auto sm:right-5 sm:w-80 lg:top-1/2 lg:-translate-y-1/2">
        {selected && <PartDetailCard type={selected} onClose={() => setSelected(null)} />}
      </div>

      {/* CC BY requires naming the model's maker; only shown once their model is on screen. */}
      {model && modelReady && (
        <p className="absolute inset-x-5 bottom-3 z-20 text-right font-mono text-2xs text-muted lg:left-auto lg:max-w-md">
          Model 3D{" "}
          <a href={model.viewerUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
            {model.name}
          </a>{" "}
          oleh{" "}
          <a href={model.authorUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
            {model.author}
          </a>{" "}
          · {model.licenseLabel} · Sketchfab
        </p>
      )}
    </div>
  );
}
