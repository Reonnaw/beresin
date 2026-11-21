"use client";

import { useCallback, useSyncExternalStore } from "react";

type PersistedStore = {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (listener: () => void) => () => void;
  };
};

/**
 * False on the server and until localStorage has loaded, so persisted state never flashes empty.
 * The persist API only exists in the browser, so it is read lazily.
 */
export function usePersistHydrated(store: PersistedStore): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => store.persist.onFinishHydration(onChange),
    [store],
  );
  return useSyncExternalStore(subscribe, () => store.persist.hasHydrated(), () => false);
}
