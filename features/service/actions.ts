"use server";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/services/auth-service";
import { estimateDiagnosis } from "@/features/diagnostic/lib/estimate";
import { parseJakartaDateTime, validateSchedule } from "@/features/service/lib/schedule";
import { SERVICE_TYPES } from "@/lib/constants/service";
import { createClient } from "@/lib/supabase/server";
import { isUuid } from "@/lib/uuid";
import type { DiagnosisSnapshot } from "@/types/domain";

export type BookingFormState = { error?: string };

const MAX_FINDINGS = 20;
const MAX_ADDRESS_LENGTH = 500;
const MAX_NOTES_LENGTH = 1000;

function parseIssueIds(raw: FormDataEntryValue | null): string[] | null {
  try {
    const value: unknown = JSON.parse(String(raw ?? "[]"));
    if (!Array.isArray(value) || value.length > MAX_FINDINGS || !value.every(isUuid)) return null;
    return [...new Set(value)];
  } catch {
    return null;
  }
}

export async function createBooking(_: BookingFormState, formData: FormData): Promise<BookingFormState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Sesi berakhir. Silakan masuk lagi." };

  const modelId = formData.get("modelId");
  if (!isUuid(modelId)) return { error: "Pilih seri laptop." };

  const serviceType = SERVICE_TYPES.find((type) => type === formData.get("serviceType"));
  if (!serviceType) return { error: "Pilih metode servis." };

  const scheduledAt = parseJakartaDateTime(formData.get("scheduledAt"));
  if (!scheduledAt) return { error: "Pilih jadwal servis." };
  const scheduleError = validateSchedule(scheduledAt);
  if (scheduleError) return { error: scheduleError };

  const address = String(formData.get("address") ?? "").trim();
  if (serviceType === "home_service" && !address) {
    return { error: "Alamat wajib diisi untuk servis ke rumah." };
  }
  const notes = String(formData.get("notes") ?? "").trim();
  if (address.length > MAX_ADDRESS_LENGTH || notes.length > MAX_NOTES_LENGTH) {
    return { error: "Alamat atau catatan terlalu panjang." };
  }

  const issueIds = parseIssueIds(formData.get("issueIds"));
  if (!issueIds) return { error: "Data diagnosis tidak valid. Muat ulang halaman lalu coba lagi." };

  const supabase = await createClient();

  // Costs are recomputed from the database; the browser only says which issues it found.
  let estimate = estimateDiagnosis([], []);
  if (issueIds.length > 0) {
    const { data: issues, error } = await supabase.from("diagnostic_issues").select("*").in("id", issueIds);
    if (error) return { error: "Gagal memuat data diagnosis. Coba lagi." };
    estimate = estimateDiagnosis(issues, issueIds);
  }

  const diagnosis: DiagnosisSnapshot = {
    modelId,
    findings: estimate.issues.map((issue) => ({ moduleType: issue.module_type, issueId: issue.id })),
    estimatedCostMin: estimate.costMin,
    estimatedCostMax: estimate.costMax,
  };

  const { data: booking, error } = await supabase
    .from("service_bookings")
    .insert({
      user_id: user.id,
      model_id: modelId,
      service_type: serviceType,
      scheduled_at: scheduledAt.toISOString(),
      address: serviceType === "home_service" ? address : null,
      notes: notes || null,
      diagnosis,
      // Quote the upper bound so the final bill never exceeds what the user agreed to.
      estimated_cost: estimate.issues.length > 0 ? estimate.costMax : null,
    })
    .select("id")
    .single();

  if (error) {
    return {
      error:
        error.code === "23503"
          ? "Seri laptop tidak ditemukan."
          : "Booking gagal dibuat. Coba beberapa saat lagi.",
    };
  }
  redirect(`/service/track?booking=${booking.id}`);
}
