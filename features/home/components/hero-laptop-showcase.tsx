"use client";

import dynamic from "next/dynamic";

import { LoadingText } from "@/components/ui/loading-text";
import { LoadErrorBoundary } from "@/features/home/components/load-error-boundary";

// WebGL needs the browser, so the scene is never prerendered.
const HeroLaptopScene = dynamic(() => import("./hero-laptop-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <LoadingText>Menyiapkan panggung 3D…</LoadingText>
    </div>
  ),
});

/** Pedestal stage with the laptop and its floating parts; the hero's backdrop. */
export function HeroLaptopShowcase() {
  return (
    <LoadErrorBoundary message="Kanvas 3D tidak bisa ditampilkan di perangkat ini. Diagnostik, katalog, dan booking tetap bisa dibuka dari halaman ini.">
      <HeroLaptopScene />
    </LoadErrorBoundary>
  );
}
