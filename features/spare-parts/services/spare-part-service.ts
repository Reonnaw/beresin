import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { LaptopModel, ModuleType, SparePartWithModel } from "@/types/domain";

const SPARE_PART_SELECT = "*, laptop_models(name, slug)";

export async function getLaptopModels(): Promise<LaptopModel[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("laptop_models").select("*").order("name");
  if (error) throw new Error(`Gagal memuat seri laptop: ${error.message}`);
  return data;
}

type SparePartFilter = {
  moduleType?: ModuleType;
  /** Parts made for this model plus universal ones. */
  modelId?: string;
};

export async function getSpareParts({ moduleType, modelId }: SparePartFilter = {}) {
  const supabase = await createClient();
  let query = supabase.from("spare_parts").select(SPARE_PART_SELECT).eq("is_active", true);
  if (moduleType) query = query.eq("module_type", moduleType);
  if (modelId) query = query.or(`model_id.eq.${modelId},model_id.is.null`);

  const { data, error } = await query.order("module_type").order("price");
  if (error) throw new Error(`Gagal memuat spare part: ${error.message}`);
  return data satisfies SparePartWithModel[];
}
