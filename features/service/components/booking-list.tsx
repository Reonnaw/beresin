import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { requireUser } from "@/features/auth/services/auth-service";
import { getDiagnosticIssues } from "@/features/diagnostic/services/diagnostic-service";
import { BookingCard } from "@/features/service/components/booking-card";
import { readFindingIssueIds } from "@/features/service/lib/diagnosis-snapshot";
import { getMyBookings } from "@/features/service/services/booking-service";
import { firstParam } from "@/lib/search-params";

export async function BookingList({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireUser("/service/track");
  const [params, bookings, issues] = await Promise.all([
    searchParams,
    getMyBookings(),
    getDiagnosticIssues(),
  ]);
  const justBooked = firstParam(params.booking);

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[4px] border border-dashed border-border p-8">
        <p className="text-muted">Belum ada tiket servis.</p>
        <Link href="/service/book" className={buttonStyles({ variant: "secondary" })}>
          Booking servis
        </Link>
      </div>
    );
  }

  const issuesById = new Map(issues.map((issue) => [issue.id, issue]));

  return (
    <div className="flex flex-col gap-4">
      {bookings.some((b) => b.id === justBooked) && (
        <p role="status" className="rounded-[4px] border border-success/30 bg-success/10 p-3 text-sm text-success">
          Booking berhasil dibuat. Teknisi akan mengonfirmasi jadwal kamu.
        </p>
      )}
      <ul className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <li key={booking.id}>
            <BookingCard
              booking={booking}
              highlighted={booking.id === justBooked}
              findings={readFindingIssueIds(booking.diagnosis).flatMap((id) => issuesById.get(id) ?? [])}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
