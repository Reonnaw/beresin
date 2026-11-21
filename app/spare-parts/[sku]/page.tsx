import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { focusRing } from "@/components/ui/button";
import { SparePartDetail } from "@/features/spare-parts/components/spare-part-detail";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Detail Spare Part" };

export default function SparePartPage(props: PageProps<"/spare-parts/[sku]">) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8">
      <Link
        href="/spare-parts"
        className={cn("self-start text-sm text-muted hover:text-foreground", focusRing)}
      >
        ← Kembali ke katalog
      </Link>
      <Suspense fallback={<p className="font-mono text-sm text-muted">Memuat spare part…</p>}>
        <SparePartDetail params={props.params} />
      </Suspense>
    </main>
  );
}
