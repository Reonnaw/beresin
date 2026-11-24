/** Mono eyebrow over a display headline, shared by the sections under the hero. */
export function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-2 pb-8">
      <p className="font-mono text-xs tracking-[0.2em] text-signal uppercase">{eyebrow}</p>
      <h2 id={id} className="max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
