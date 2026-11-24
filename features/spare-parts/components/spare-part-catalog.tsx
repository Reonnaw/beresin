import Link from "next/link";

import { EmptyState } from "@/components/ui/empty-state";
import { actionLinkStyles } from "@/components/ui/text-link";
import { CatalogFilters } from "@/features/spare-parts/components/catalog-filters";
import { SparePartCard } from "@/features/spare-parts/components/spare-part-card";
import { getLaptopModels, getSpareParts } from "@/features/spare-parts/services/spare-part-service";
import { firstParam, parseModuleType } from "@/lib/search-params";

export async function SparePartCatalog({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const moduleType = parseModuleType(params.module);
  const models = await getLaptopModels();
  // Unknown slugs fall back to "all models" instead of an empty catalog.
  const model = models.find((m) => m.slug === firstParam(params.model));
  const parts = await getSpareParts({ moduleType, modelId: model?.id });

  return (
    <>
      <CatalogFilters models={models} active={{ module: moduleType, model: model?.slug }} />
      <p className="font-mono text-xs text-muted tabular-nums" aria-live="polite">
        {parts.length} spare part
      </p>
      {parts.length === 0 ? (
        <EmptyState
          action={
            <Link href="/spare-parts" className={actionLinkStyles}>
              Hapus semua filter
            </Link>
          }
        >
          Tidak ada spare part untuk filter ini.
        </EmptyState>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {parts.map((part) => (
            <li key={part.id} className="flex">
              <SparePartCard part={part} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
