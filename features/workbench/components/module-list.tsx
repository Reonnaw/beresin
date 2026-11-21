"use client";

import { MODULE_LABELS, MODULE_TYPES } from "@/lib/constants/modules";
import { useWorkbenchStore } from "@/stores/workbench-store";

/** Keyboard-reachable twin of the canvas: select and show/hide every module. */
export function ModuleList() {
  const hiddenModules = useWorkbenchStore((s) => s.hiddenModules);
  const selectedModule = useWorkbenchStore((s) => s.selectedModule);
  const toggleModule = useWorkbenchStore((s) => s.toggleModule);
  const selectModule = useWorkbenchStore((s) => s.selectModule);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold">Modul</h2>
      <ul className="divide-y divide-border rounded-[4px] border border-border">
        {MODULE_TYPES.map((type) => {
          const hidden = hiddenModules.includes(type);
          const selected = selectedModule === type;
          return (
            <li
              key={type}
              className={`flex items-center gap-3 border-l-2 px-3 py-2 ${selected ? "border-l-accent bg-surface-muted" : "border-l-transparent"}`}
            >
              <input
                type="checkbox"
                checked={!hidden}
                onChange={() => toggleModule(type)}
                aria-label={`Tampilkan ${MODULE_LABELS[type]}`}
                className="size-4 accent-accent"
              />
              <button
                type="button"
                disabled={hidden}
                aria-pressed={selected}
                onClick={() => selectModule(selected ? null : type)}
                className="flex flex-1 items-baseline justify-between text-left text-sm disabled:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>{MODULE_LABELS[type]}</span>
                <span className="font-mono text-xs text-muted">{type}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
