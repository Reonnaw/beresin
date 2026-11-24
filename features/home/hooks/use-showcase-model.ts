"use client";

import { useEffect, useState } from "react";

import type { ShowcaseModel } from "@/lib/sketchfab/sketchfab-service";

/** Sketchfab laptop for the hero, or null while loading and whenever the service has none. */
export function useShowcaseModel(): ShowcaseModel | null {
  const [model, setModel] = useState<ShowcaseModel | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/showcase-model", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { model: null }))
      .then((data: { model: ShowcaseModel | null }) => setModel(data.model))
      // A failed request leaves model at null, which keeps the procedural laptop.
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return model;
}
