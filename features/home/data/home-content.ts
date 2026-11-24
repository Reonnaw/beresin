import type { ModuleType } from "@/types/domain";

/*
 * Static homepage copy. Module types and SKU prefixes mirror supabase/seed.sql,
 * so every link below lands on catalog data that exists.
 */

export const HERO_CONTENT = {
  eyebrow: "8 modul · bongkar pasang · tanpa tebak-tebakan",
  headline: "Bongkar laptopmu di layar dulu.",
  description:
    "Putar model 3D, klik modul yang bermasalah, dan lihat perkiraan biayanya. Setelah itu beli spare part yang cocok atau booking teknisi, semuanya dari sini.",
  primaryCta: { label: "Mulai Diagnostik 3D", href: "/workbench" },
  secondaryCta: { label: "Katalog Spare Part", href: "/spare-parts" },
  canvasHint: "Arahkan kursor ke komponen yang melayang, klik untuk detailnya.",
} as const;

type HomeModule = {
  name: string;
  /** Shared prefix of this module's SKUs in the catalog. */
  skuPrefix: string;
  spec: string;
  /** What usually sends this module to the bench. */
  failure: string;
};

export const HOME_MODULES = {
  screen: {
    name: "Panel Layar",
    skuPrefix: "BRS-SCR",
    spec: '13.5" 2K · 16" QHD 165Hz',
    failure: "Panel retak, garis, backlight mati",
  },
  keyboard: {
    name: "Input Deck",
    skuPrefix: "BRS-KBD",
    spec: "Keyboard backlit + touchpad",
    failure: "Tombol mati, kena tumpahan",
  },
  battery: {
    name: "Battery Pack",
    skuPrefix: "BRS-BAT",
    spec: "Li-ion 4 cell · 61Wh / 85Wh",
    failure: "Cepat habis, menggembung",
  },
  fan: {
    name: "Kipas & Heatsink",
    skuPrefix: "BRS-FAN",
    spec: "Heatsink tembaga · kipas 4 pin",
    failure: "Berisik, panas berlebih",
  },
  ssd: {
    name: "NVMe SSD",
    skuPrefix: "BRS-SSD",
    spec: "M.2 2280 Gen4 · 512GB / 1TB",
    failure: "Tidak terdeteksi, booting lambat",
  },
  ram: {
    name: "RAM DDR5",
    skuPrefix: "BRS-RAM",
    spec: "SO-DIMM 5600MHz · 16GB / 32GB",
    failure: "Blue screen acak, bunyi beep",
  },
  expansion_card: {
    name: "Expansion Card",
    skuPrefix: "BRS-EXP",
    spec: "USB-C 3.2 · HDMI 2.1",
    failure: "Port longgar, tidak mengisi",
  },
  motherboard: {
    name: "Mainboard",
    skuPrefix: "BRS-MB",
    spec: "Ryzen 7 7840U · Ryzen 9 7940HS",
    failure: "Mati total, korsleting",
  },
} as const satisfies Record<ModuleType, HomeModule>;

type WorkflowStep = {
  code: string;
  title: string;
  description: string;
  link: { label: string; href: string };
};

export const WORKFLOW_STEPS = [
  {
    code: "01 / INSPECT 3D",
    title: "Bongkar modelnya",
    description:
      "Putar laptop, geser explode view, dan klik modul untuk melihat letaknya di dalam chassis.",
    link: { label: "Buka workbench", href: "/workbench" },
  },
  {
    code: "02 / DIAGNOSE",
    title: "Centang gejalanya",
    description:
      "Pilih gejala per modul. Rentang biaya dan lama pengerjaan langsung dihitung dari daftar kerusakan.",
    link: { label: "Mulai diagnosis", href: "/workbench" },
  },
  {
    code: "03 / PART ATAU SERVIS",
    title: "Ganti sendiri atau serahkan",
    description:
      "Pesan spare part yang kompatibel, atau kirim hasil diagnosis ke teknisi lewat booking servis.",
    link: { label: "Booking servis", href: "/service/book" },
  },
] as const satisfies readonly WorkflowStep[];
