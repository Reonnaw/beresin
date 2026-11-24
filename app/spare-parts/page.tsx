import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { LoadingText } from "@/components/ui/loading-text";
import { SparePartCatalog } from "@/features/spare-parts/components/spare-part-catalog";

export const metadata: Metadata = { title: "Spare Part" };

export default function SparePartsPage(props: PageProps<"/spare-parts">) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8">
      <PageHeader
        eyebrow="Katalog · modul pengganti"
        title="Katalog Spare Part"
        description="Modul pengganti untuk laptop modular. Pilih seri laptop untuk melihat part yang kompatibel."
      />
      <Suspense fallback={<LoadingText>Memuat katalog…</LoadingText>}>
        <SparePartCatalog searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
