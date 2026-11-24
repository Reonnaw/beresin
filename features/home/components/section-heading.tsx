/** h2 of the sections under the hero; it unmasks upward as it scrolls into view. */
export function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="reveal-wipe max-w-2xl pb-8 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
      {title}
    </h2>
  );
}
