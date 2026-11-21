import { create } from "zustand";

import type { ModuleType } from "@/types/domain";

type WorkbenchState = {
  /** 0 = assembled, 1 = fully exploded. */
  explode: number;
  hiddenModules: ModuleType[];
  selectedModule: ModuleType | null;
  setExplode: (value: number) => void;
  toggleModule: (module: ModuleType) => void;
  selectModule: (module: ModuleType | null) => void;
  reset: () => void;
};

const initialState = {
  explode: 0,
  hiddenModules: [] as ModuleType[],
  selectedModule: null,
};

export const useWorkbenchStore = create<WorkbenchState>()((set) => ({
  ...initialState,
  setExplode: (value) => set({ explode: Math.min(1, Math.max(0, value)) }),
  toggleModule: (module) =>
    set((state) => {
      const hiding = !state.hiddenModules.includes(module);
      return {
        hiddenModules: hiding
          ? [...state.hiddenModules, module]
          : state.hiddenModules.filter((m) => m !== module),
        // A hidden module cannot stay selected: it is no longer on the canvas.
        selectedModule:
          hiding && state.selectedModule === module
            ? null
            : state.selectedModule,
      };
    }),
  selectModule: (module) => set({ selectedModule: module }),
  reset: () => set(initialState),
}));
