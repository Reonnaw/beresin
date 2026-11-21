"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const digest =
    error instanceof Error && "digest" in error ? String(error.digest) : null;

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold">Terjadi kesalahan</h1>
      <p className="text-muted">
        Halaman ini gagal dimuat. Coba lagi, atau kembali beberapa saat lagi.
      </p>
      {digest && (
        <p className="font-mono text-sm text-muted">Kode: {digest}</p>
      )}
      <button
        type="button"
        onClick={retry}
        className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Coba lagi
      </button>
    </main>
  );
}
