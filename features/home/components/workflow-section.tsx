import Link from "next/link";

import { focusRing } from "@/components/ui/button";
import { SectionHeading } from "@/features/home/components/section-heading";
import { WORKFLOW_STEPS } from "@/features/home/data/home-content";
import { cn } from "@/lib/cn";

/** Inspect 3D, diagnose, then part or service, as one strip that stacks on small screens. */
export function WorkflowSection() {
  return (
    <section aria-labelledby="workflow-title" className="border-y border-border bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-20">
        <SectionHeading
          id="workflow-title"
          eyebrow="Alur kerja · 3 langkah"
          title="Dari bongkar model sampai laptop kembali normal."
        />
        <ol className="grid gap-px overflow-hidden rounded-[6px] border border-border bg-border md:grid-cols-3">
          {WORKFLOW_STEPS.map((step, index) => (
            <li key={step.code} className="relative flex flex-col gap-3 bg-surface p-5 sm:p-6">
              <p className="flex items-center gap-2 font-mono text-xs tracking-wide text-accent-secondary">
                <span aria-hidden className="size-2 bg-accent" />
                {step.code}
              </p>
              <h3 className="font-display text-xl font-semibold">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
              <Link
                href={step.link.href}
                className={cn("mt-auto self-start pt-2 text-sm font-semibold underline-offset-4 hover:underline", focusRing)}
              >
                {step.link.label}
              </Link>
              {index < WORKFLOW_STEPS.length - 1 && (
                <span aria-hidden className="absolute top-5 right-5 hidden font-mono text-muted md:block">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
