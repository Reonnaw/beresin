import Link from "next/link";

import { focusRing } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { MODULE_LABELS, MODULE_TYPES } from "@/lib/constants/modules";
import type { LaptopModel, ModuleType } from "@/types/domain";

type Filters = { module?: ModuleType; model?: string };

function catalogHref({ module, model }: Filters) {
  const params = new URLSearchParams();
  if (module) params.set("module", module);
  if (model) params.set("model", model);
  const query = params.toString();
  return query ? `/spare-parts?${query}` : "/spare-parts";
}

function FilterChip({ href, active, children }: { href: string; active: boolean; children: string }) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "rounded-[4px] border px-2.5 py-1 text-sm",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface hover:bg-surface-muted",
        focusRing,
      )}
    >
      {children}
    </Link>
  );
}

/** Link-based filters: they work without JavaScript and keep the URL shareable. */
export function CatalogFilters({ models, active }: { models: LaptopModel[]; active: Filters }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Seri laptop">
        <span className="w-14 font-mono text-xs uppercase text-muted">Seri</span>
        <FilterChip href={catalogHref({ ...active, model: undefined })} active={!active.model}>
          Semua seri
        </FilterChip>
        {models.map((model) => (
          <FilterChip
            key={model.slug}
            href={catalogHref({ ...active, model: model.slug })}
            active={active.model === model.slug}
          >
            {model.name}
          </FilterChip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Modul">
        <span className="w-14 font-mono text-xs uppercase text-muted">Modul</span>
        <FilterChip href={catalogHref({ ...active, module: undefined })} active={!active.module}>
          Semua
        </FilterChip>
        {MODULE_TYPES.map((type) => (
          <FilterChip
            key={type}
            href={catalogHref({ ...active, module: type })}
            active={active.module === type}
          >
            {MODULE_LABELS[type]}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}
