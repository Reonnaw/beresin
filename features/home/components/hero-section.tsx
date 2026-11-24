import Link from "next/link";

import { motionStep } from "@/components/ui/motion";
import { HeroLaptopShowcase } from "@/features/home/components/hero-laptop-showcase";
import { HERO_CONTENT } from "@/features/home/data/home-content";
import { cn } from "@/lib/cn";

type Action = (typeof HERO_CONTENT)["actions"][number];

const ACTION_TONES = {
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  surface: "bg-surface text-foreground hover:bg-surface-muted",
} as const;

/** One tile of the console under the stage: a mono step tag over the action, arrow at the far edge. */
function ConsoleAction({ action, step }: { action: Action; step: number }) {
  return (
    <Link
      href={action.href}
      style={motionStep(step)}
      className={cn(
        "intro",
        "group flex items-center justify-between gap-8 px-5 py-4 transition-colors sm:px-8 sm:py-6",
        // Tiles touch each other and one is orange, so focus is an ink outline drawn inside the tile.
        "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground",
        ACTION_TONES[action.tone],
      )}
    >
      <span className="flex flex-col gap-1">
        <span className="font-mono text-2xs tracking-[0.2em] uppercase">{action.tag}</span>
        <span className="text-lg font-bold tracking-tight sm:text-2xl">{action.label}</span>
      </span>
      <span aria-hidden className="font-mono text-2xl transition-transform motion-safe:group-hover:translate-x-2">
        →
      </span>
    </Link>
  );
}

/**
 * Headline row, then the 3D stage with nothing laid over it, then two action tiles docked
 * to the stage's bottom edge. Keeping copy off the canvas means part labels are never covered.
 * On load the headline, description and tiles rise in sequence.
 */
export function HeroSection() {
  const { headline, description, actions } = HERO_CONTENT;

  // From lg the hero is exactly one screen tall, so the console is always visible above the fold.
  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col border-b border-border lg:h-[calc(100svh-3.5rem)] lg:min-h-[40rem]"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 pt-10 pb-8 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-12">
        <h1 id="hero-title" className="intro text-4xl font-bold text-balance sm:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="intro text-base text-muted lg:pb-2" style={motionStep(1)}>
          {description}
        </p>
      </div>

      {/* isolate keeps the floating part labels' huge z-index below the sticky header. */}
      <div className="relative isolate h-[52svh] min-h-80 border-t border-border lg:h-auto lg:min-h-0 lg:flex-1">
        <HeroLaptopShowcase />
      </div>

      <div className="grid divide-y divide-border border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {actions.map((action, index) => (
          <ConsoleAction key={action.href} action={action} step={index + 2} />
        ))}
      </div>
    </section>
  );
}
