import assert from "node:assert/strict";
import { test } from "node:test";

import { safeNextPath } from "./safe-redirect.ts";

test("keeps same-origin paths", () => {
  assert.equal(safeNextPath("/service/track?x=1"), "/service/track?x=1");
});

test("rejects external, protocol-relative and missing targets", () => {
  for (const value of ["https://evil.test", "//evil.test", "/\\evil.test", "", undefined, 42]) {
    assert.equal(safeNextPath(value), "/");
  }
});
