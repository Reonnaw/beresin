"use client";

import { useWorkbenchStore } from "@/stores/workbench-store";

export function ExplodeControl() {
  const explode = useWorkbenchStore((s) => s.explode);
  const setExplode = useWorkbenchStore((s) => s.setExplode);
  const reset = useWorkbenchStore((s) => s.reset);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <label htmlFor="explode" className="text-sm font-semibold">
          Exploded view
        </label>
        <output htmlFor="explode" className="font-mono text-sm tabular-nums">
          {Math.round(explode * 100)}%
        </output>
      </div>
      <input
        id="explode"
        type="range"
        min={0}
        max={100}
        value={Math.round(explode * 100)}
        onChange={(event) => setExplode(Number(event.target.value) / 100)}
        className="w-full accent-accent"
      />
      <button
        type="button"
        onClick={reset}
        className="self-start rounded-[4px] border border-border bg-surface px-3 py-1.5 text-sm font-medium hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Rakit ulang
      </button>
    </section>
  );
}
