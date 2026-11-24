import Link from "next/link";

import { motionStep } from "@/components/ui/motion";
import { actionLinkStyles } from "@/components/ui/text-link";
import { SectionHeading } from "@/features/home/components/section-heading";
import { WORKFLOW_STEPS } from "@/features/home/data/home-content";
import { cn } from "@/lib/cn";

/** Inspect 3D, diagnose, then part or service, as one strip that stacks on small screens. */
export function WorkflowSection() {
  return (
    <section aria-labelledby="workflow-title" className="border-y border-border bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-20">
        <SectionHeading id="workflow-title" title="Dari bongkar model sampai laptop kembali normal." />
        <ol className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {WORKFLOW_STEPS.map((step, index) => (
            <li key={step.code} className="relative flex bg-surface">
              <div className="reveal flex w-full flex-col gap-3 p-5 sm:p-6" style={motionStep(index)}>
                <p className="flex items-center gap-2 font-mono text-xs tracking-wide text-accent-secondary">
                  <span aria-hidden className="size-2 bg-accent" />
                  {step.code}
                </p>
                <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="text-sm text-muted">{step.description}</p>
                <Link href={step.link.href} className={cn(actionLinkStyles, "mt-auto self-start pt-2")}>
                  {step.link.label}
                </Link>
              </div>
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
