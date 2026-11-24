"use client";

import { Center, useGLTF } from "@react-three/drei";
import { Component, type ReactNode, Suspense, useEffect, useMemo } from "react";
import { Box3, Vector3 } from "three";

/** World units the downloaded laptop is scaled to across its widest side, matching the procedural one. */
const TARGET_WIDTH = 2.8;

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
  // Sketchfab models come in any unit, so fit the widest side instead of trusting the file's scale.
  const scale = useMemo(() => {
    const size = new Box3().setFromObject(scene).getSize(new Vector3());
    return TARGET_WIDTH / Math.max(size.x, size.z, 0.001);
  }, [scene]);

  useEffect(onReady, [onReady]);

  return (
    <Center top>
      <primitive object={scene} scale={scale} />
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
