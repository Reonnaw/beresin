import { MODULE_TYPES } from "@/lib/constants/modules";
import type { ModuleType } from "@/types/domain";

type ParamValue = string | string[] | undefined;

export function firstParam(value: ParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** URL input is untrusted: only known module types pass. */
export function parseModuleType(value: ParamValue): ModuleType | undefined {
  const raw = firstParam(value);
  return MODULE_TYPES.find((type) => type === raw);
}
