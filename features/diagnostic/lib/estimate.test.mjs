import assert from "node:assert/strict";
import { test } from "node:test";

import { estimateDiagnosis } from "./estimate.ts";

const issue = (id, min, max, minutes) => ({
  id,
  estimated_cost_min: min,
  estimated_cost_max: max,
  estimated_duration_minutes: minutes,
});

test("sums only the chosen issues and ignores unknown ids", () => {
  const issues = [issue("a", 100, 200, 30), issue("b", 50, 80, 15), issue("c", 1, 1, 1)];
  const estimate = estimateDiagnosis(issues, ["a", "b", "stale"]);
  assert.deepEqual(estimate.issues.map((i) => i.id), ["a", "b"]);
  assert.equal(estimate.costMin, 150);
  assert.equal(estimate.costMax, 280);
  assert.equal(estimate.durationMinutes, 45);
});

test("an empty diagnosis costs nothing", () => {
  const estimate = estimateDiagnosis([issue("a", 100, 200, 30)], []);
  assert.equal(estimate.costMin + estimate.costMax + estimate.durationMinutes, 0);
});
