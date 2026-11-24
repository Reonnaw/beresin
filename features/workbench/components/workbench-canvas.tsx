"use client";

import dynamic from "next/dynamic";

import { LoadingText } from "@/components/ui/loading-text";

// WebGL needs the browser, so the scene is never prerendered.
const WorkbenchScene = dynamic(() => import("./workbench-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <LoadingText>Memuat kanvas 3D…</LoadingText>
    </div>
  ),
});

export function WorkbenchCanvas() {
  return <WorkbenchScene />;
}
