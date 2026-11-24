/**
 * Physical material colors of the parts: a PCB is green and gold fingers are gold in
 * any room light, so these stay fixed. Theme-dependent colors come from useScenePalette.
 */
export const HARDWARE_MATERIALS = {
  screen: "#0D1B2A",
  pcb: "#0F3D2E",
  chip: "#1A1B1E",
  gold: "#D4A72C",
  copper: "#B87333",
  metal: "#A9B1C1",
  label: "#E6E9F0",
  casing: "#262D3B",
  fanHousing: "#2A3140",
  fanBase: "#1B2130",
  seam: "#5B6478",
} as const;
