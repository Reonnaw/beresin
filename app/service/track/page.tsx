import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { BookingList } from "@/features/service/components/booking-list";

export const metadata: Metadata = { title: "Lacak Servis" };

export default function ServiceTrackPage(props: PageProps<"/service/track">) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-8">
      <PageHeader title="Lacak Servis" description="Status setiap tiket servis kamu, dari konfirmasi sampai selesai." />
      <Suspense fallback={<p className="font-mono text-sm text-muted">Memuat tiket servis…</p>}>
        <BookingList searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
