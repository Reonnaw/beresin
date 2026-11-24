import { Eyebrow } from "@/components/ui/eyebrow";

/** Eyebrow over an h2, shared by the sections under the hero; the h1 version is PageHeader. */
export function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-2 pb-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
