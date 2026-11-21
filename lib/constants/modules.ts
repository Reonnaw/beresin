import type { IssueSeverity, ModuleType } from "@/types/domain";

/** Disassembly order: outer modules first, motherboard last. */
export const MODULE_TYPES = [
  "screen",
  "keyboard",
  "battery",
  "fan",
  "ssd",
  "ram",
  "expansion_card",
  "motherboard",
] as const satisfies readonly ModuleType[];

export const MODULE_LABELS = {
  screen: "Layar",
  keyboard: "Keyboard",
  battery: "Baterai",
  fan: "Kipas",
  ssd: "SSD",
  ram: "RAM",
  expansion_card: "Expansion Card",
  motherboard: "Motherboard",
} as const satisfies Record<ModuleType, string>;

export const SEVERITY_LABELS = {
  low: "Ringan",
  medium: "Sedang",
  high: "Berat",
  critical: "Kritis",
} as const satisfies Record<IssueSeverity, string>;
