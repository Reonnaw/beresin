import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroLaptopShowcase } from "@/features/home/components/hero-laptop-showcase";
import { HERO_CONTENT } from "@/features/home/data/home-content";

/**
 * Phones stack headline, stage and actions. From lg the stage fills the section
 * and the copy floats over its top and bottom edges, leaving the pedestal clear.
 */
export function HeroSection() {
  const { eyebrow, headline, description, primaryCta, secondaryCta, canvasHint } = HERO_CONTENT;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col border-b border-border lg:min-h-[calc(100svh-3.5rem)]"
    >
      <div className="flex flex-col items-center gap-4 px-5 pt-10 text-center sm:pt-14 lg:pointer-events-none">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          id="hero-title"
          className="max-w-4xl text-4xl font-bold text-balance sm:text-6xl lg:text-7xl"
        >
          {headline}
        </h1>
      </div>

      <div className="relative h-[52svh] min-h-80 lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        <HeroLaptopShowcase />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 pb-10 lg:pointer-events-none lg:mt-auto lg:flex-row lg:items-end lg:justify-between lg:pb-8">
        <div className="flex max-w-md flex-col gap-5 lg:pointer-events-auto">
          <p className="text-base text-muted sm:text-lg">{description}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={primaryCta.href} className={buttonStyles({ variant: "accent", size: "lg" })}>
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className={buttonStyles({ variant: "secondary", size: "lg" })}>
              {secondaryCta.label}
            </Link>
          </div>
        </div>
        <p className="hidden max-w-56 font-mono text-xs text-muted lg:block">{canvasHint}</p>
      </div>
    </section>
  );
}
