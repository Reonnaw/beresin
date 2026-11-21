"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { LoadErrorBoundary } from "@/features/home/components/load-error-boundary";

function CanvasStatus({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center p-5 font-mono text-xs text-muted">
      {children}
    </div>
  );
}

// WebGL needs the browser, so the scene is never prerendered.
const CounterScene = dynamic(() => import("./counter-scene"), {
  ssr: false,
  loading: () => <CanvasStatus>Memuat model 3D…</CanvasStatus>,
});

/** The bench half of the counter: the laptop the slip is about. */
export function CounterCanvas() {
  return (
    <LoadErrorBoundary message="Model 3D tidak bisa ditampilkan di perangkat ini. Nota di sampingnya tetap bisa dipakai.">
      <CounterScene />
    </LoadErrorBoundary>
  );
}
