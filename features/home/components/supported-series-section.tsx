import Link from "next/link";
import { Suspense } from "react";

import { Card } from "@/components/ui/card";
import { LoadingText } from "@/components/ui/loading-text";
import { motionStep } from "@/components/ui/motion";
import { actionLinkStyles } from "@/components/ui/text-link";
import { LoadErrorBoundary } from "@/features/home/components/load-error-boundary";
import { SectionHeading } from "@/features/home/components/section-heading";
import { getLaptopModels } from "@/features/spare-parts/services/spare-part-service";
import { cn } from "@/lib/cn";

async function SeriesList() {
  const models = await getLaptopModels();

  if (models.length === 0) {
    return <p className="text-sm text-muted">Belum ada seri laptop terdaftar.</p>;
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {models.map((model, index) => (
        <li key={model.id} className="reveal flex" style={motionStep(index)}>
          <Card className="flex w-full flex-col gap-3 p-5">
            <p className="flex justify-between gap-3 font-mono text-xs text-muted">
              <span>{model.slug}</span>
              <span>
                {model.brand}
                {model.release_year && ` · ${model.release_year}`}
              </span>
            </p>
            <h3 className="text-xl font-bold tracking-tight">{model.name}</h3>
            <Link
              href={`/spare-parts?model=${model.slug}`}
              className={cn(actionLinkStyles, "mt-auto self-start")}
            >
              Spare part untuk seri ini
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  );
}

/** Laptop series in the catalog, read live so a new series shows up without a deploy. */
export function SupportedSeriesSection() {
  return (
    <section aria-labelledby="series-title" className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-20">
      <SectionHeading id="series-title" title="Laptop modular yang bisa kamu diagnosis di sini." />
      <LoadErrorBoundary message="Daftar seri laptop gagal dimuat.">
        <Suspense fallback={<LoadingText>Memuat seri…</LoadingText>}>
          <SeriesList />
        </Suspense>
      </LoadErrorBoundary>
    </section>
  );
}
