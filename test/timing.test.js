import assert from "node:assert/strict";
import test from "node:test";
import { debounce, debounceFrame, debounceLeading } from "../src/timing.js";

function stubRaf() {
  const originalRaf = globalThis.requestAnimationFrame;
  const originalCaf = globalThis.cancelAnimationFrame;
  const pending = new Map();
  let nextId = 0;
  globalThis.requestAnimationFrame = (callback) => {
    nextId += 1;
    pending.set(nextId, callback);
    return nextId;
  };
  globalThis.cancelAnimationFrame = (id) => {
    pending.delete(id);
  };
  return {
    pending,
    restore() {
      globalThis.requestAnimationFrame = originalRaf;
      globalThis.cancelAnimationFrame = originalCaf;
    },
    flush() {
      for (const callback of [...pending.values()]) callback();
      pending.clear();
    },
  };
}

test("debounce.cancel prevents a scheduled call", async () => {
  const calls = [];
  const fn = debounce((value) => calls.push(value), 5);
  fn(1);
  fn.cancel();
  await new Promise((resolve) => setTimeout(resolve, 15));
  assert.deepEqual(calls, []);
});

test("debounceLeading.cancel prevents a pending call", async () => {
  const calls = [];
  const fn = debounceLeading((value) => calls.push(value), 5);
  fn(1);
  fn(2);
  fn.cancel();
  await new Promise((resolve) => setTimeout(resolve, 10));
  fn(3);
  assert.deepEqual(calls, [1, 3]);
});

test("debounceFrame runs once per frame with the last arguments", () => {
  const raf = stubRaf();
  try {
    const calls = [];
    const fn = debounceFrame((value) => calls.push(value));
    fn(1);
    fn(2);
    assert.equal(raf.pending.size, 1);
    raf.flush();
    assert.deepEqual(calls, [2]);
  } finally {
    raf.restore();
  }
});

test("debounceFrame.cancel discards the scheduled call", () => {
  const raf = stubRaf();
  try {
    const calls = [];
    const fn = debounceFrame(() => calls.push("x"));
    fn();
    fn.cancel();
    assert.equal(raf.pending.size, 0);
    raf.flush();
    assert.deepEqual(calls, []);
  } finally {
    raf.restore();
  }
});

test("debounce.flush runs the pending call immediately", () => {
  const calls = [];
  const fn = debounce((value) => calls.push(value), 1000);
  fn(1);
  fn(2);
  fn.flush();
  assert.deepEqual(calls, [2]);
  fn.flush();
  assert.deepEqual(calls, [2]);
});
