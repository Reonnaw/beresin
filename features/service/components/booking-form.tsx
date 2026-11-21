"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { Button, focusRing } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, inputStyles } from "@/components/ui/field";
import { estimateDiagnosis } from "@/features/diagnostic/lib/estimate";
import { type BookingFormState, createBooking } from "@/features/service/actions";
import { CLOSE_HOUR, MIN_LEAD_HOURS, OPEN_HOUR } from "@/features/service/lib/schedule";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { cn } from "@/lib/cn";
import { MODULE_LABELS } from "@/lib/constants/modules";
import { SERVICE_TYPE_LABELS, SERVICE_TYPES } from "@/lib/constants/service";
import { formatCostRange, formatDuration } from "@/lib/format";
import { useDiagnosticStore } from "@/stores/diagnostic-store";
import type { DiagnosticIssue, LaptopModel, ServiceType } from "@/types/domain";

type BookingFormProps = {
  models: LaptopModel[];
  issues: DiagnosticIssue[];
  defaultModelId?: string;
};

export function BookingForm({ models, issues, defaultModelId }: BookingFormProps) {
  const hydrated = usePersistHydrated(useDiagnosticStore);
  const findings = useDiagnosticStore((s) => s.findings);
  const [serviceType, setServiceType] = useState<ServiceType>("drop_off");
  const [state, formAction, pending] = useActionState<BookingFormState, FormData>(createBooking, {});

  const estimate = estimateDiagnosis(
    issues,
    findings.map((f) => f.issueId),
  );

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <input type="hidden" name="issueIds" value={JSON.stringify(estimate.issues.map((i) => i.id))} />

      <Card className="flex flex-col gap-5 p-5">
        <Field id="modelId" label="Seri laptop">
          <select id="modelId" name="modelId" defaultValue={defaultModelId} required className={inputStyles}>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </Field>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1.5 text-sm font-semibold">Metode servis</legend>
          {SERVICE_TYPES.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 rounded-[4px] border border-border p-3 text-sm has-checked:border-accent has-checked:bg-surface-muted"
            >
              <input
                type="radio"
                name="serviceType"
                value={type}
                checked={serviceType === type}
                onChange={() => setServiceType(type)}
                className="accent-accent"
              />
              {SERVICE_TYPE_LABELS[type]}
            </label>
          ))}
        </fieldset>

        <Field
          id="scheduledAt"
          label="Jadwal"
          hint={`Jam layanan ${OPEN_HOUR}.00–${CLOSE_HOUR}.00 WIB, minimal ${MIN_LEAD_HOURS} jam dari sekarang.`}
        >
          <input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            required
            aria-describedby="scheduledAt-message"
            className={cn(inputStyles, "font-mono")}
          />
        </Field>

        {serviceType === "home_service" && (
          <Field id="address" label="Alamat servis">
            <textarea id="address" name="address" rows={3} maxLength={500} required className={inputStyles} />
          </Field>
        )}

        <Field id="notes" label="Catatan untuk teknisi" hint="Opsional.">
          <textarea
            id="notes"
            name="notes"
            rows={3}
            maxLength={1000}
            aria-describedby="notes-message"
            className={inputStyles}
          />
        </Field>
      </Card>

      <Card className="flex h-fit flex-col gap-4 p-5">
        <h2 className="font-semibold">Hasil diagnosis</h2>
        {!hydrated ? (
          <p className="font-mono text-sm text-muted">Memuat diagnosis…</p>
        ) : estimate.issues.length === 0 ? (
          <p className="text-sm text-muted">
            Belum ada kerusakan yang dipilih. Teknisi akan memeriksa menyeluruh, atau{" "}
            <Link href="/workbench" className={cn("font-semibold text-foreground underline", focusRing)}>
              diagnosis dulu di Workbench
            </Link>
            .
          </p>
        ) : (
          <>
            <ul className="flex flex-col gap-1.5 text-sm">
              {estimate.issues.map((issue) => (
                <li key={issue.id}>
                  <span className="font-mono text-xs text-danger">{MODULE_LABELS[issue.module_type]}</span>{" "}
                  {issue.title}
                </li>
              ))}
            </ul>
            <dl className="grid grid-cols-[1fr_auto] gap-y-1 border-t border-border pt-3 text-sm">
              <dt className="text-muted">Estimasi biaya</dt>
              <dd className="font-mono font-semibold">{formatCostRange(estimate.costMin, estimate.costMax)}</dd>
              <dt className="text-muted">Estimasi waktu</dt>
              <dd className="font-mono">{formatDuration(estimate.durationMinutes)}</dd>
            </dl>
          </>
        )}
        <p className="text-sm text-danger" aria-live="polite">
          {state.error}
        </p>
        <Button type="submit" disabled={pending || !hydrated}>
          {pending ? "Mengirim booking…" : "Booking servis"}
        </Button>
      </Card>
    </form>
  );
}
