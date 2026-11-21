import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-6">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          beresin<span className="text-accent">.</span>
        </Link>
      </div>
    </header>
  );
}
