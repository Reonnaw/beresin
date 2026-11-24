import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 px-6 py-24">
      <p className="font-mono text-xs tracking-[0.2em] text-accent-secondary uppercase">Error 404</p>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Halaman tidak ditemukan</h1>
      <p className="text-muted">Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
      <Link href="/" className={buttonStyles()}>
        Kembali ke beranda
      </Link>
    </main>
  );
}
