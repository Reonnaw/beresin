import { WORKFLOW_STEPS } from "@/features/home/data/home-content";

export function WorkflowStepsSection() {
  return (
    <section aria-labelledby="workflow-title" className="border-y border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-5 py-16">
        <div className="flex flex-col gap-2 pb-8">
          <p className="font-mono text-xs tracking-wide text-muted">ALUR KERJA // 3 LANGKAH</p>
          <h2 id="workflow-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Dari bongkar model sampai laptop kembali normal.
          </h2>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-[6px] border border-border bg-border md:grid-cols-3">
          {WORKFLOW_STEPS.map((step) => (
            <li key={step.code} className="flex flex-col gap-3 bg-surface p-5">
              <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-wide">
                <span aria-hidden className="size-2 bg-accent" />
                {step.code}
              </p>
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
