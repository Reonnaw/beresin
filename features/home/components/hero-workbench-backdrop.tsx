"use client";

import dynamic from "next/dynamic";
import { catchError } from "next/error";
import Link from "next/link";
import type { ReactNode } from "react";

import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExplodeControl } from "@/features/workbench/components/explode-control";
import { MODULE_LABELS } from "@/lib/constants/modules";
import { useWorkbenchStore } from "@/stores/workbench-store";

function BackdropStatus({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-end justify-end p-5 font-mono text-xs text-muted lg:items-center lg:justify-center lg:pl-[40%]">
      {children}
    </div>
  );
}

// WebGL needs the browser, so the scene is never prerendered.
const HeroWorkbenchScene = dynamic(() => import("./hero-workbench-scene"), {
  ssr: false,
  loading: () => <BackdropStatus>Memuat model 3D…</BackdropStatus>,
});

// The hero copy and CTAs stay usable when WebGL is missing or the context fails.
const SceneBoundary = catchError(function SceneFallback() {
  return <BackdropStatus>[WEBGL: UNAVAILABLE] Model 3D tidak dapat ditampilkan.</BackdropStatus>;
});

/** Interactive 3D layer behind the hero. Shares the workbench store, so explode and selection carry over. */
export function HeroWorkbenchBackdrop() {
  return (
    <div className="absolute inset-0">
      <SceneBoundary>
        <HeroWorkbenchScene />
      </SceneBoundary>
    </div>
  );
}

/** Compact explode slider plus a shortcut into the workbench for the module picked on the canvas. */
export function HeroExplodePanel() {
  const selectedModule = useWorkbenchStore((s) => s.selectedModule);

  return (
    <Card className="flex w-full flex-col gap-3 p-4 sm:w-72">
      <ExplodeControl />
      <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
        <p className="font-mono text-xs text-muted">
          {selectedModule ? `MODUL: ${MODULE_LABELS[selectedModule]}` : "Klik modul pada model"}
        </p>
        {selectedModule && (
          <Link
            href={`/workbench?module=${selectedModule}`}
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            Inspeksi
          </Link>
        )}
      </div>
    </Card>
  );
}
