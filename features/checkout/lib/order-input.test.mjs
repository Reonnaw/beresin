import assert from "node:assert/strict";
import { test } from "node:test";

import { parseOrderLines } from "./order-input.ts";

const id = "6f1c2a3b-4d5e-4f60-8a9b-0c1d2e3f4a5b";

test("accepts well-formed lines", () => {
  assert.deepEqual(parseOrderLines(JSON.stringify([{ spare_part_id: id, quantity: 2 }])), [
    { spare_part_id: id, quantity: 2 },
  ]);
});

test("rejects malformed carts", () => {
  for (const raw of [
    undefined,
    "not json",
    "[]",
    JSON.stringify({ spare_part_id: id, quantity: 1 }),
    JSON.stringify([{ spare_part_id: "x", quantity: 1 }]),
    JSON.stringify([{ spare_part_id: id, quantity: 0 }]),
    JSON.stringify([{ spare_part_id: id, quantity: 1.5 }]),
    JSON.stringify([{ spare_part_id: id, quantity: 100 }]),
    JSON.stringify([null]),
  ]) {
    assert.equal(parseOrderLines(raw), null, String(raw));
  }
});
