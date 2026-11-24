/** The .theme-stage tokens from app/globals.css, as hex for three.js materials, which cannot read CSS variables. */
export const STAGE_PALETTE = {
  background: "#0B0E17",
  gridCell: "#1E293B",
  // Major grid lines: a dimmed signal cyan, so the floor reads as space without competing with the ring.
  gridMajor: "#155E75",
  pedestal: "#111725",
  ring: "#E85D2A",
  signal: "#22D3EE",
  chassis: "#3A4152",
  chassisEdge: "#5B6478",
  screen: "#0D1B2A",
  pcb: "#0F3D2E",
  chip: "#1A1B1E",
  gold: "#D4A72C",
  copper: "#B87333",
  metal: "#A9B1C1",
  label: "#E6E9F0",
} as const;
