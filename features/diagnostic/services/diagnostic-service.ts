import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { DiagnosticIssue } from "@/types/domain";

export async function getDiagnosticIssues(): Promise<DiagnosticIssue[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("diagnostic_issues")
    .select("*")
    .order("module_type")
    .order("severity", { ascending: false });

  if (error) throw new Error(`Gagal memuat daftar kerusakan: ${error.message}`);
  return data;
}
