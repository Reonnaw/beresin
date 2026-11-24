import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

// Reads the real token blocks, so a palette edit that breaks AA fails here instead of on screen.
const css = readFileSync(new URL("../../app/globals.css", import.meta.url), "utf8");

function tokens(selector) {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `missing ${selector} block`);
  const block = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

const light = tokens(":root");
// Dark only overrides values, so anything it leaves out falls back to :root.
const dark = { ...light, ...tokens('[data-theme="dark"]') };

function hex(theme, name) {
  const value = theme[name];
  const ref = value?.match(/^var\(--([\w-]+)\)$/);
  return ref ? hex(theme, ref[1]) : value;
}

function luminance(color) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(color.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const TEXT = ["text-primary", "text-secondary", "accent-secondary-ink", "status-ok-ink", "status-fault-ink"];
const BACKGROUNDS = ["bg-canvas", "bg-surface", "bg-subtle"];

for (const [name, theme] of [["light", light], ["dark", dark]]) {
  test(`${name}: every text token reads at 4.5:1 on every background`, () => {
    for (const fg of TEXT) {
      for (const bg of BACKGROUNDS) {
        const ratio = contrast(hex(theme, fg), hex(theme, bg));
        assert.ok(ratio >= 4.5, `${fg} on ${bg} is ${ratio.toFixed(2)}:1`);
      }
    }
  });

  test(`${name}: button labels read on their fills`, () => {
    assert.ok(contrast(hex(theme, "text-inverse"), hex(theme, "text-primary")) >= 4.5, "primary button");
    assert.ok(contrast(hex(theme, "text-on-accent"), hex(theme, "accent-primary")) >= 4.5, "accent button");
  });
}
