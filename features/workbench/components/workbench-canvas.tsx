"use client";

import dynamic from "next/dynamic";

// WebGL needs the browser, so the scene is never prerendered.
const WorkbenchScene = dynamic(() => import("./workbench-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-sm text-muted">
      Memuat kanvas 3D…
    </div>
  ),
});

export function WorkbenchCanvas() {
  return <WorkbenchScene />;
}
