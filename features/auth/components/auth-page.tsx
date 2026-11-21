import { Suspense } from "react";

import { Card } from "@/components/ui/card";
import { AuthForm } from "@/features/auth/components/auth-form";
import { firstParam } from "@/lib/search-params";
import { safeNextPath } from "@/lib/safe-redirect";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const COPY = {
  login: { title: "Masuk", description: "Masuk untuk checkout, booking servis, dan melacak tiket." },
  register: { title: "Buat akun", description: "Satu akun untuk pesanan spare part dan tiket servis." },
} as const;

async function AuthFormWithParams({ mode, searchParams }: { mode: "login" | "register"; searchParams: SearchParams }) {
  const params = await searchParams;
  const initialError =
    firstParam(params.error) === "confirmation" ? "Link konfirmasi tidak valid atau kedaluwarsa." : undefined;
  return <AuthForm mode={mode} next={safeNextPath(firstParam(params.next))} initialError={initialError} />;
}

/** Shared shell for /login and /register. */
export function AuthPage({ mode, searchParams }: { mode: "login" | "register"; searchParams: SearchParams }) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12">
      <Card className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{COPY[mode].title}</h1>
          <p className="text-sm text-muted">{COPY[mode].description}</p>
        </div>
        <Suspense fallback={<p className="font-mono text-sm text-muted">Memuat formulir…</p>}>
          <AuthFormWithParams mode={mode} searchParams={searchParams} />
        </Suspense>
      </Card>
    </main>
  );
}
