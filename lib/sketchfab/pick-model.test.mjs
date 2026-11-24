import assert from "node:assert/strict";
import { test } from "node:test";

import { MAX_GLB_BYTES, pickShowcaseModel } from "./pick-model.ts";

function model(overrides) {
  return {
    uid: "abc",
    name: "Laptop",
    faceCount: 8000,
    viewerUrl: "https://sketchfab.com/3d-models/laptop-abc",
    user: { displayName: "Maker", profileUrl: "https://sketchfab.com/maker" },
    license: { label: "CC Attribution" },
    archives: { glb: { size: 500_000 } },
    ...overrides,
  };
}

test("skips non-laptops, heavy files and models without a glb", () => {
  const picked = pickShowcaseModel([
    model({ uid: "desk", name: "Sci-fi Computer" }),
    model({ uid: "heavy", archives: { glb: { size: MAX_GLB_BYTES + 1 } } }),
    model({ uid: "noglb", archives: {} }),
    model({ uid: "empty", faceCount: 0 }),
    model({ uid: "ok", name: "Gaming Notebook" }),
  ]);
  assert.equal(picked?.uid, "ok");
  assert.equal(picked?.author, "Maker");
});

test("returns null when nothing fits", () => {
  assert.equal(pickShowcaseModel([model({ name: "Keyboard" })]), null);
  assert.equal(pickShowcaseModel([]), null);
});
