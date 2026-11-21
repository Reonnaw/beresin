import { PriceListSection } from "@/features/home/components/price-list-section";
import { ServiceCounterSection } from "@/features/home/components/service-counter-section";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceCounterSection />
      <PriceListSection />
    </main>
  );
}
