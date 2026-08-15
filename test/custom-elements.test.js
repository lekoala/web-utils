import assert from "node:assert/strict";
import test from "node:test";
import { defineCustomElement } from "../src/custom-elements.js";

test("defineCustomElement registers a free name", () => {
  const defined = new Map();
  const registry = {
    get: (name) => defined.get(name),
    define: (name, ctor) => defined.set(name, ctor),
  };
  const ctor = class {};
  assert.equal(defineCustomElement("x-el", ctor, registry), true);
  assert.equal(defined.get("x-el"), ctor);
});

test("defineCustomElement skips an already-defined name", () => {
  const ctor = class {};
  const registry = { get: () => ctor, define: () => {} };
  assert.equal(defineCustomElement("x-el", class {}, registry), false);
});

test("defineCustomElement returns false without a registry", () => {
  assert.equal(defineCustomElement("x-el", class {}, undefined), false);
});
