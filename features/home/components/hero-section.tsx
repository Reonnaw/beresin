import Link from "next/link";

import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroLaptopShowcase } from "@/features/home/components/hero-laptop-showcase";
import { HERO_CONTENT } from "@/features/home/data/home-content";
import { cn } from "@/lib/cn";

type Action = (typeof HERO_CONTENT)["actions"][number];

const ACTION_TONES = {
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  surface: "bg-surface text-foreground hover:bg-surface-muted",
} as const;

/** One tile of the console under the stage: a mono step tag over the action, arrow at the far edge. */
function ConsoleAction({ action }: { action: Action }) {
  return (
    <Link
      href={action.href}
      className={cn(
        "group flex items-center justify-between gap-8 px-5 py-4 transition-colors sm:px-6 sm:py-5 lg:min-w-72",
        // Tiles touch each other and one is orange, so focus is an ink outline drawn inside the tile.
        "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground",
        ACTION_TONES[action.tone],
      )}
    >
      <span className="flex flex-col gap-1">
        <span className="font-mono text-2xs tracking-[0.2em] uppercase">{action.tag}</span>
        <span className="text-lg font-bold tracking-tight">{action.label}</span>
      </span>
      <span aria-hidden className="font-mono text-lg transition-transform motion-safe:group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

/**
 * Headline row, then the 3D stage with nothing laid over it, then a console docked
 * to the stage's bottom edge. Keeping copy off the canvas means part labels are never covered.
 */
export function HeroSection() {
  const { eyebrow, headline, description, actions, canvasHint } = HERO_CONTENT;

  // From lg the hero is exactly one screen tall, so the console is always visible above the fold.
  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col border-b border-border lg:h-[calc(100svh-3.5rem)] lg:min-h-[40rem]"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 pt-10 pb-8 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-12">
        <div className="flex flex-col gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="hero-title" className="text-4xl font-bold text-balance sm:text-6xl lg:text-7xl">
            {headline}
          </h1>
        </div>
        <p className="text-base text-muted lg:pb-2">{description}</p>
      </div>

      {/* isolate keeps the floating part labels' huge z-index below the sticky header. */}
      <div className="relative isolate h-[52svh] min-h-80 border-t border-border lg:h-auto lg:min-h-0 lg:flex-1">
        <HeroLaptopShowcase />
      </div>

      <div className="grid divide-y divide-border border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
        <p className="hidden items-center px-5 font-mono text-xs text-muted lg:flex">{canvasHint}</p>
        {actions.map((action) => (
          <ConsoleAction key={action.href} action={action} />
        ))}
      </div>
    </section>
  );
}
