import { CounterCanvas } from "@/features/home/components/counter-canvas";
import { ServiceSlipPanel } from "@/features/home/components/service-slip-panel";

/** First screen: the laptop on the bench and the service slip that describes it. */
export function ServiceCounterSection() {
  return (
    <section className="grid border-b border-border lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
      {/* The slip comes first in the DOM so the h1 leads; the canvas is moved up visually. */}
      <div className="px-5 py-8 lg:py-12 lg:pr-10 lg:pl-0">
        <ServiceSlipPanel />
      </div>
      <div className="relative order-first h-[42vh] min-h-72 border-b border-border lg:sticky lg:top-14 lg:h-[calc(100dvh-3.5rem)] lg:self-start lg:border-b-0">
        <CounterCanvas />
        <p className="pointer-events-none absolute bottom-4 left-5 max-w-xs font-mono text-xs text-muted">
          Klik bagian laptop untuk menyaring keluhan. Bagian merah dicurigai rusak.
        </p>
      </div>
    </section>
  );
}
