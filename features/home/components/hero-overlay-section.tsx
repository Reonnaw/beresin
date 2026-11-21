import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import {
  HeroExplodePanel,
  HeroWorkbenchBackdrop,
} from "@/features/home/components/hero-workbench-backdrop";
import { HERO_CONTENT } from "@/features/home/data/home-content";

export function HeroOverlaySection() {
  const { status, headline, subheadline, primaryCta, secondaryCta } = HERO_CONTENT;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex flex-col border-b border-border lg:min-h-[calc(100dvh-3.5rem)]"
    >
      {/* Below lg the canvas is its own block under the copy; from lg up it fills the hero. */}
      <div className="relative order-2 h-[50vh] min-h-80 border-y border-border lg:absolute lg:inset-0 lg:order-none lg:h-auto lg:border-0">
        <HeroWorkbenchBackdrop />
      </div>

      <div className="relative order-1 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-10 lg:pointer-events-none lg:order-none lg:py-16">
        <div className="flex max-w-md flex-col gap-6 lg:pointer-events-auto xl:max-w-xl">
          <p className="inline-flex items-center gap-2 self-start rounded-[4px] border border-border bg-surface px-2 py-1 font-mono text-[11px] font-medium tracking-wide">
            <span aria-hidden className="size-2 rounded-full bg-success" />
            {status}
          </p>
          <h1
            id="hero-title"
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {headline}
          </h1>
          <p className="text-base text-pretty text-muted sm:text-lg">{subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={primaryCta.href} className={buttonStyles({ variant: "primary" })}>
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className={buttonStyles({ variant: "secondary" })}>
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative order-3 px-5 py-5 lg:absolute lg:right-6 lg:bottom-6 lg:order-none lg:p-0">
        <HeroExplodePanel />
      </div>
    </section>
  );
}
