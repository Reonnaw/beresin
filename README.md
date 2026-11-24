# Beresin

Diagnostik kerusakan laptop modular dalam 3D. Pengguna membongkar laptop per modul, memilih gejala kerusakan, membeli spare part, dan booking servis.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres, Auth, RLS) · React Three Fiber + drei · Zustand

## Menjalankan

```bash
pnpm install
cp .env.example .env.local   # isi URL dan anon key dari Supabase Dashboard > Project Settings > API
                             # SKETCHFAB_API_KEY opsional: tanpa key, hero memakai laptop 3D prosedural
pnpm dev
```

### Database

Jalankan skema lalu data contoh di project Supabase, lewat SQL Editor atau Supabase CLI:

1. `supabase/migrations/20261121000000_init_schema.sql`: enum, tabel, trigger, RLS, dan fungsi `place_order`.
2. `supabase/migrations/20261121000001_grant_api_roles.sql`: hak akses tabel untuk role `anon` dan `authenticated`.
3. `supabase/seed.sql`: dua seri laptop, daftar kerusakan, dan katalog spare part.

Dengan CLI yang sudah di-link: `supabase db push`, lalu jalankan `seed.sql`. Untuk menjadikan akun teknisi atau admin, ubah `profiles.role` dari dashboard.

## Halaman

| Route | Isi |
| --- | --- |
| `/` | Beranda: panggung 3D laptop di atas pedestal dengan part yang melayang, ringkasan modul, alur kerja, seri yang didukung |
| `/workbench` | Workbench: kanvas 3D, exploded view, pilih modul, checklist gejala, estimasi biaya |
| `/spare-parts` | Katalog spare part, filter modul dan seri laptop, status stok |
| `/spare-parts/[sku]` | Detail spare part dan kerusakan yang diatasi |
| `/cart` | Keranjang (disimpan di localStorage) |
| `/checkout` | Checkout; pesanan dibuat oleh `place_order` |
| `/service/book` | Booking servis berisi hasil diagnosis Workbench |
| `/service/track` | Status tiket servis |
| `/login`, `/register` | Autentikasi email Supabase |

| Script | Fungsi |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Build produksi |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Cek tipe TypeScript |
| `pnpm test` | Unit test logika murni (`node --test`, file `*.test.mjs`) |
| `pnpm db:types` | Generate ulang `types/database.ts` dari project Supabase yang sudah di-link (`supabase link`) |

## Struktur

```
app/                       Route: page tetap tipis, hanya menyusun komponen fitur
components/ui/             Primitive UI: Button, Badge, Card, Field, Eyebrow, EmptyState, LoadingText, gaya link
components/layout/         Shell aplikasi: header, footer, navigasi, page header
components/theme/          Tema terang/gelap: token, script anti-flash, provider, switcher
components/three/          Pencahayaan 3D bersama untuk semua kanvas
features/<domain>/
  components/              Komponen fitur (home, workbench, diagnostic, spare-parts, cart, checkout, service, auth)
  components/three/        Objek 3D prosedural (beranda: pedestal, lantai grid, laptop, part melayang)
  data/                    Konten statis beranda
  services/                Query Supabase sisi server (server-only)
  lib/                     Logika murni yang bisa dites
  actions.ts               Server Action
stores/                    Zustand: workbench (3D), diagnosis, keranjang
hooks/                     Hook bersama, termasuk useScenePalette untuk warna three.js
lib/                       Format, konstanta, validasi, client Supabase, layanan Sketchfab
types/                     Tipe skema Supabase dan tipe domain
supabase/                  Migrasi SQL dan seed
proxy.ts                   Refresh session Supabase di setiap request
```

## Tema

Light dan dark mode memakai CSS custom properties di `app/globals.css`, dipilih lewat `<html data-theme>`.

- Pilihan pengguna (Terang, Gelap, Ikuti sistem) disimpan di `localStorage`. Script di `<head>` menerapkannya sebelum halaman tampil, jadi tidak ada kedipan tema saat reload.
- Token mengikuti nama spesifikasi (`--bg-canvas`, `--text-primary`, `--accent-primary`, `--status-fault`, ...). Kelas Tailwind (`bg-surface`, `text-muted`, `text-danger`) memetakan ke token tersebut.
- Warna aksen dan status dipakai apa adanya untuk isian, ring, dan aksen 3D. Teks memakai varian `-ink` yang lolos kontras 4.5:1; `components/theme/contrast.test.mjs` menjaga hal ini.
- Kanvas 3D membaca token `--scene-*` lewat `useScenePalette`, sehingga grid, pedestal, cahaya, dan material ikut berganti tema. Warna fisik part (PCB, emas, tembaga) tetap.

## Konvensi

- Client Supabase server dibuat per request lewat `createClient()` di `lib/supabase/server.ts`, jangan dibagi antar request.
- Harga disimpan sebagai integer Rupiah penuh.
- Data dari request (cookie, `searchParams`, `params`) dibaca di dalam `<Suspense>` karena `cacheComponents` aktif.
- Harga, stok, dan estimasi biaya selalu dihitung ulang di server; data dari browser hanya berisi id dan jumlah.
- Commit mengikuti [Conventional Commits](https://www.conventionalcommits.org/).
