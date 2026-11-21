import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BookingStatusSteps } from "@/features/service/components/booking-status-steps";
import { cn } from "@/lib/cn";
import { MODULE_LABELS } from "@/lib/constants/modules";
import { BOOKING_STATUS_LABELS, SERVICE_TYPE_LABELS } from "@/lib/constants/service";
import { formatDateTime, formatRupiah, formatShortId } from "@/lib/format";
import type { BookingStatus, DiagnosticIssue, ServiceBookingWithModel } from "@/types/domain";

const STATUS_TONES = {
  pending: "neutral",
  confirmed: "neutral",
  in_progress: "accent",
  completed: "success",
  cancelled: "danger",
} as const satisfies Record<BookingStatus, BadgeTone>;

type BookingCardProps = {
  booking: ServiceBookingWithModel;
  findings: DiagnosticIssue[];
  highlighted: boolean;
};

export function BookingCard({ booking, findings, highlighted }: BookingCardProps) {
  return (
    <Card
      id={`booking-${booking.id}`}
      className={cn("flex flex-col gap-4 p-5", highlighted && "outline-2 outline-offset-2 outline-accent")}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-xs text-muted">Tiket #{formatShortId(booking.id)}</p>
          <h2 className="font-semibold">{booking.laptop_models.name}</h2>
        </div>
        <Badge tone={STATUS_TONES[booking.status]}>{BOOKING_STATUS_LABELS[booking.status]}</Badge>
      </div>

      <BookingStatusSteps status={booking.status} />

      <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
        <dt className="text-muted">Metode</dt>
        <dd>{SERVICE_TYPE_LABELS[booking.service_type]}</dd>
        <dt className="text-muted">Jadwal</dt>
        <dd className="font-mono">{formatDateTime(booking.scheduled_at)} WIB</dd>
        {booking.address && (
          <>
            <dt className="text-muted">Alamat</dt>
            <dd className="whitespace-pre-line">{booking.address}</dd>
          </>
        )}
        <dt className="text-muted">Estimasi biaya</dt>
        <dd className="font-mono">
          {booking.estimated_cost === null ? "Menunggu pemeriksaan" : `≤ ${formatRupiah(booking.estimated_cost)}`}
        </dd>
        <dt className="text-muted">Kerusakan</dt>
        <dd>
          {findings.length === 0 ? (
            <span className="text-muted">Pemeriksaan menyeluruh</span>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {findings.map((issue) => (
                <li key={issue.id}>
                  <span className="font-mono text-xs text-danger">{MODULE_LABELS[issue.module_type]}</span>{" "}
                  {issue.title}
                </li>
              ))}
            </ul>
          )}
        </dd>
      </dl>
    </Card>
  );
}
