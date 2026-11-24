import { HeroSection } from "@/features/home/components/hero-section";
import { ModularOverviewSection } from "@/features/home/components/modular-overview-section";
import { SupportedSeriesSection } from "@/features/home/components/supported-series-section";
import { WorkflowSection } from "@/features/home/components/workflow-section";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <ModularOverviewSection />
      <WorkflowSection />
      <SupportedSeriesSection />
    </main>
  );
}
