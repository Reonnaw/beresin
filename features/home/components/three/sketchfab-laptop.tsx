"use client";

import { Center, useGLTF } from "@react-three/drei";
import { Component, type ReactNode, Suspense, useEffect, useMemo } from "react";
import { Box3, Vector3 } from "three";

/** World units the downloaded laptop is scaled to along its largest dimension, matching the procedural one. */
const TARGET_SIZE = 2.8;

class ModelErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function LoadedModel({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url);
  // useGLTF caches one scene per URL and shares it across mounts. Measuring and scaling that
  // shared object meant a remount (soft navigation, dev refresh) measured the already-scaled
  // model, got a scale near 1 and showed it at raw size. A fresh clone per mount is always unscaled.
  const { model, scale } = useMemo(() => {
    const model = scene.clone(true);
    // Sketchfab models come in any unit, so fit the largest dimension instead of trusting the file's scale.
    const size = new Box3().setFromObject(model).getSize(new Vector3());
    return { model, scale: TARGET_SIZE / Math.max(size.x, size.y, size.z, 0.001) };
  }, [scene]);

  useEffect(onReady, [onReady]);

  return (
    <Center top>
      <group scale={scale}>
        <primitive object={model} />
      </group>
    </Center>
  );
}

type SketchfabLaptopProps = {
  url: string;
  /** Shown while the glb downloads and for good if it fails: expired link, CORS, bad file. */
  fallback: ReactNode;
  onReady: () => void;
};

/** Downloaded laptop resting on y = 0, falling back to `fallback` on any load error. */
export function SketchfabLaptop({ url, fallback, onReady }: SketchfabLaptopProps) {
  return (
    <ModelErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <LoadedModel url={url} onReady={onReady} />
      </Suspense>
    </ModelErrorBoundary>
  );
}
