import { HeroOverlaySection } from "@/features/home/components/hero-overlay-section";
import { ModularBreakdownSection } from "@/features/home/components/modular-breakdown-section";
import { SupportedSeriesSection } from "@/features/home/components/supported-series-section";
import { WorkflowStepsSection } from "@/features/home/components/workflow-steps-section";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroOverlaySection />
      <ModularBreakdownSection />
      <WorkflowStepsSection />
      <SupportedSeriesSection />
    </main>
  );
}
