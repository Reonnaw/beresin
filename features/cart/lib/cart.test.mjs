import assert from "node:assert/strict";
import { test } from "node:test";

import { addToCart, cartSummary, setCartQuantity } from "./cart.ts";

const ssd = { id: "ssd", sku: "SSD", name: "SSD", price: 750000, stock: 3 };
const ram = { id: "ram", sku: "RAM", name: "RAM", price: 100, stock: 0 };

test("adding the same part merges quantities and caps at stock", () => {
  let items = addToCart([], ssd, 2);
  items = addToCart(items, ssd, 5);
  assert.equal(items.length, 1);
  assert.equal(items[0].quantity, 3);
});

test("out-of-stock parts are never added", () => {
  assert.deepEqual(addToCart([], ram), []);
});

test("setting quantity caps at stock and zero removes the item", () => {
  const items = addToCart([], ssd);
  assert.equal(setCartQuantity(items, "ssd", 99)[0].quantity, 3);
  assert.deepEqual(setCartQuantity(items, "ssd", 0), []);
});

test("summary counts units and subtotal", () => {
  const items = addToCart([], ssd, 2);
  assert.deepEqual(cartSummary(items), { count: 2, subtotal: 1500000 });
});
