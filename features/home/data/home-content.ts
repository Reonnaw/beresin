import type { ModuleType } from "@/types/domain";

/**
 * Symptom groups on the service slip, named by where the owner notices the
 * problem instead of by part, since most people do not know which module failed.
 */
export const SYMPTOM_GROUP_LABELS = {
  screen: "Di layar",
  keyboard: "Saat mengetik",
  battery: "Soal daya",
  fan: "Panas dan suara",
  ssd: "Saat booting atau buka file",
  ram: "Crash dan bunyi beep",
  expansion_card: "Di port samping",
  motherboard: "Tidak hidup atau tidak mengisi",
} as const satisfies Record<ModuleType, string>;
