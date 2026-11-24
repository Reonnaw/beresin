import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { LoadingText } from "@/components/ui/loading-text";
import { BookingList } from "@/features/service/components/booking-list";

export const metadata: Metadata = { title: "Lacak Servis" };

export default function ServiceTrackPage(props: PageProps<"/service/track">) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-8">
      <PageHeader eyebrow="Servis · status tiket" title="Lacak Servis" description="Status setiap tiket servis kamu, dari konfirmasi sampai selesai." />
      <Suspense fallback={<LoadingText>Memuat tiket servis…</LoadingText>}>
        <BookingList searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
