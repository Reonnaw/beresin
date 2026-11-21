import assert from "node:assert/strict";
import { test } from "node:test";

import { parseJakartaDateTime, validateSchedule } from "./schedule.ts";

const now = new Date("2026-11-21T03:00:00Z"); // 10.00 WIB

test("parses datetime-local values as Jakarta time", () => {
  assert.equal(parseJakartaDateTime("2026-11-22T09:30")?.toISOString(), "2026-11-22T02:30:00.000Z");
  for (const bad of ["", "2026-11-22", "2026-11-22 09:30", "2026-13-40T99:99", 5, null]) {
    assert.equal(parseJakartaDateTime(bad), null, String(bad));
  }
});

test("accepts a slot during opening hours with enough lead time", () => {
  assert.equal(validateSchedule(parseJakartaDateTime("2026-11-21T13:00"), now), null);
});

test("rejects slots too soon, too far or outside opening hours", () => {
  assert.match(validateSchedule(parseJakartaDateTime("2026-11-21T11:00"), now), /minimal/);
  assert.match(validateSchedule(parseJakartaDateTime("2027-03-01T10:00"), now), /maksimal/);
  assert.match(validateSchedule(parseJakartaDateTime("2026-11-22T21:00"), now), /Jam layanan/);
  assert.match(validateSchedule(parseJakartaDateTime("2026-11-22T07:59"), now), /Jam layanan/);
});
