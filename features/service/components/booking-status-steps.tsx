import { cn } from "@/lib/cn";
import { BOOKING_STATUS_FLOW, BOOKING_STATUS_LABELS } from "@/lib/constants/service";
import type { BookingStatus } from "@/types/domain";

export function BookingStatusSteps({ status }: { status: BookingStatus }) {
  if (status === "cancelled") {
    return <p className="font-mono text-sm text-danger">{BOOKING_STATUS_LABELS.cancelled}</p>;
  }

  const current = BOOKING_STATUS_FLOW.indexOf(status);

  return (
    <ol className="grid grid-cols-4 gap-1" aria-label="Progres servis">
      {BOOKING_STATUS_FLOW.map((step, index) => {
        const done = index < current || status === "completed";
        const active = index === current && status !== "completed";
        return (
          <li
            key={step}
            aria-current={active ? "step" : undefined}
            className="flex flex-col gap-1.5"
          >
            <span
              className={cn(
                "h-1 rounded-full",
                done ? "bg-success" : active ? "bg-accent" : "bg-border",
              )}
            />
            <span className={cn("text-xs", done || active ? "text-foreground" : "text-muted")}>
              {BOOKING_STATUS_LABELS[step]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
