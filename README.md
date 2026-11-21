# Beresin

Diagnostik kerusakan laptop modular dalam 3D. Pengguna membongkar laptop per modul, memilih gejala kerusakan, membeli spare part, dan booking servis.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres, Auth, RLS) · React Three Fiber + drei · Zustand

## Menjalankan

```bash
pnpm install
cp .env.example .env.local   # isi URL dan anon key dari Supabase Dashboard > Project Settings > API
pnpm dev
```

| Script | Fungsi |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Build produksi |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Cek tipe TypeScript |
| `pnpm db:types` | Generate ulang `types/database.ts` dari project Supabase yang sudah di-link (`supabase link`) |

## Struktur

```
app/                 Route, layout, dan boundary (error, not-found)
components/layout/   Shell aplikasi (header)
lib/env.ts           Validasi environment variable
lib/supabase/        Client browser, server, dan helper proxy session
lib/constants/       Label modul dan tingkat kerusakan
lib/format.ts        Format Rupiah dan tanggal (Asia/Jakarta)
types/database.ts    Tipe skema Supabase
types/domain.ts      Tipe domain (alias row, snapshot diagnosis)
proxy.ts             Refresh session Supabase di setiap request
```

## Konvensi

- Client Supabase server dibuat per request lewat `createClient()` di `lib/supabase/server.ts`, jangan dibagi antar request.
- Harga disimpan sebagai integer Rupiah penuh.
- Commit mengikuti [Conventional Commits](https://www.conventionalcommits.org/).
