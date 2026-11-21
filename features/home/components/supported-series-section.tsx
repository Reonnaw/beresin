import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { focusRing } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SERVICE_GUARANTEES, SUPPORTED_SERIES } from "@/features/home/data/home-content";
import { cn } from "@/lib/cn";

export function SupportedSeriesSection() {
  return (
    <section aria-labelledby="series-title" className="mx-auto w-full max-w-7xl px-5 py-16">
      <div className="flex flex-col gap-2 pb-8">
        <p className="font-mono text-xs tracking-wide text-muted">SERI DIDUKUNG // KOMPATIBILITAS</p>
        <h2 id="series-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Seri laptop modular yang bisa kamu diagnosis.
        </h2>
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {SUPPORTED_SERIES.map((series) => (
          <li key={series.slug} className="flex">
            <Card className="flex w-full flex-col gap-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-muted">{series.slug}</span>
                <Badge tone="success">Kompatibel</Badge>
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{series.name}</h3>
              <ul className="flex flex-wrap gap-2">
                {series.specs.map((spec) => (
                  <li
                    key={spec}
                    className="rounded-[4px] border border-border bg-surface-muted px-2 py-1 font-mono text-xs"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
              <Link
                href={`/spare-parts?model=${series.slug}`}
                className={cn(
                  "mt-auto self-start text-sm font-semibold underline-offset-4 hover:underline",
                  focusRing,
                )}
              >
                Lihat spare part seri ini →
              </Link>
            </Card>
          </li>
        ))}
      </ul>

      <ul
        aria-label="Jaminan layanan"
        className="mt-8 grid gap-px overflow-hidden rounded-[6px] border border-border bg-border sm:grid-cols-3"
      >
        {SERVICE_GUARANTEES.map((guarantee) => (
          <li key={guarantee.label} className="flex flex-col gap-1 bg-surface-muted p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span aria-hidden className="size-2 rounded-full bg-success" />
              {guarantee.label}
            </p>
            <p className="text-sm text-muted">{guarantee.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
