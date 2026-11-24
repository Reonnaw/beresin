import assert from "node:assert/strict";
import { test } from "node:test";

import { parseThemePreference, resolveTheme } from "./theme-config.ts";

test("only explicit light or dark are kept", () => {
  assert.equal(parseThemePreference("light"), "light");
  assert.equal(parseThemePreference("dark"), "dark");
  for (const value of [null, undefined, "", "system", "DARK", 1]) {
    assert.equal(parseThemePreference(value), "system");
  }
});

test("system follows the OS, explicit choices ignore it", () => {
  assert.equal(resolveTheme("system", true), "dark");
  assert.equal(resolveTheme("system", false), "light");
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme("dark", false), "dark");
});

test("the serialized functions still run on their own, as in the head script", () => {
  const parse = new Function(`return (${parseThemePreference})`)();
  const resolve = new Function(`return (${resolveTheme})`)();
  assert.equal(resolve(parse("dark"), false), "dark");
  assert.equal(resolve(parse(null), true), "dark");
});
