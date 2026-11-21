import type { ModuleType } from "@/types/domain";

/*
 * Static homepage copy. Module types, SKU prefixes and series slugs mirror
 * supabase/seed.sql so every card links to data that exists.
 */

export const HERO_CONTENT = {
  status: "[SYSTEM: MODULAR 3D DIAGNOSTICS // READY]",
  headline: "Bongkar laptopmu di layar sebelum membongkarnya di meja.",
  subheadline:
    "Inspeksi tiap modul dalam 3D, pilih gejala yang kamu alami, lalu dapatkan estimasi biaya, spare part yang kompatibel, dan jadwal servis dalam satu alur.",
  primaryCta: { label: "Mulai Diagnostik 3D", href: "/workbench" },
  secondaryCta: { label: "Jelajahi Spare Part", href: "/spare-parts" },
} as const;

export type HomeModule = {
  /** Module the workbench focuses and the catalog filters by. */
  moduleType: ModuleType;
  name: string;
  skuPrefix: string;
  spec: string;
  symptoms: readonly string[];
};

export const HOME_MODULES = [
  {
    moduleType: "screen",
    name: "Screen & Bezel",
    skuPrefix: "BRS-SCR",
    spec: '13.5" 2256x1504 · 16" QHD 165Hz',
    symptoms: ["Panel retak", "Backlight mati"],
  },
  {
    moduleType: "keyboard",
    name: "Keyboard Deck",
    skuPrefix: "BRS-KBD",
    spec: "Input deck backlit + touchpad",
    symptoms: ["Tombol tidak merespons", "Kena tumpahan cairan"],
  },
  {
    moduleType: "battery",
    name: "Battery Pack",
    skuPrefix: "BRS-BAT",
    spec: "Li-ion 4 cell · 61Wh / 85Wh",
    symptoms: ["Baterai drop", "Baterai menggembung"],
  },
  {
    moduleType: "fan",
    name: "Cooling Fan & Heatsink",
    skuPrefix: "BRS-FAN",
    spec: "Heatsink tembaga · kipas 4 pin",
    symptoms: ["Kipas berisik", "Overheat"],
  },
  {
    moduleType: "ram",
    name: "RAM & Storage",
    skuPrefix: "BRS-RAM / BRS-SSD",
    spec: "DDR5 SO-DIMM · NVMe M.2 2280 Gen4",
    symptoms: ["Blue screen acak", "SSD tidak terdeteksi"],
  },
  {
    moduleType: "motherboard",
    name: "Mainboard",
    skuPrefix: "BRS-MB",
    spec: "Ryzen 7 7840U · Ryzen 9 7940HS",
    symptoms: ["Mati total", "Port charging rusak"],
  },
] as const satisfies readonly HomeModule[];

export type WorkflowStep = {
  code: string;
  title: string;
  description: string;
};

export const WORKFLOW_STEPS = [
  {
    code: "01 // INSPECT",
    title: "Bongkar model 3D",
    description:
      "Putar laptop, geser explode view, dan klik modul untuk melihat posisinya di dalam chassis.",
  },
  {
    code: "02 // DIAGNOSE",
    title: "Pilih gejala, lihat estimasi",
    description:
      "Centang gejala per modul. Rentang biaya dan durasi pengerjaan dihitung langsung dari daftar kerusakan.",
  },
  {
    code: "03 // RESOLVE",
    title: "Beli part atau booking servis",
    description:
      "Pesan spare part yang kompatibel, atau kirim hasil diagnosis ke teknisi lewat booking servis.",
  },
] as const satisfies readonly WorkflowStep[];

export type SupportedSeries = {
  /** Matches laptop_models.slug. */
  slug: string;
  name: string;
  specs: readonly string[];
};

export const SUPPORTED_SERIES = [
  {
    slug: "modular-13",
    name: "Beresin Modular 13",
    specs: ['13.5" 2256x1504', "Baterai 61Wh", "Ryzen 7 7840U"],
  },
  {
    slug: "modular-16",
    name: "Beresin Modular 16",
    specs: ['16" QHD 165Hz', "Baterai 85Wh", "Ryzen 9 7940HS"],
  },
] as const satisfies readonly SupportedSeries[];

export type ServiceGuarantee = {
  label: string;
  description: string;
};

export const SERVICE_GUARANTEES = [
  {
    label: "Harga transparan",
    description: "Estimasi biaya terlihat sebelum kamu memesan apa pun.",
  },
  {
    label: "Kompatibilitas terverifikasi",
    description: "Setiap SKU dipetakan ke seri laptop yang bisa memakainya.",
  },
  {
    label: "Tiket servis real-time",
    description: "Status booking bisa dilacak dari konfirmasi hingga selesai.",
  },
] as const satisfies readonly ServiceGuarantee[];

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
