import assert from "node:assert/strict";
import test from "node:test";
import {
  getBoolData,
  parseBooleanAttribute,
  parseEnumAttribute,
  parseIntegerListAttribute,
  removeAttr,
  setAttr,
  setData,
  toggleAttr,
} from "../src/dom/attrs.js";
import { addClass, removeClass, toggleClass } from "../src/dom/classes.js";
import { ce, insertAfter, parseHTML } from "../src/dom/create.js";
import { dispatch, on, once } from "../src/dom/events.js";
import { byId, qs, qsa } from "../src/dom/query.js";
import { domReady } from "../src/dom/ready.js";

class FakeClassList {
  #classes = new Set();
  add(...names) {
    for (const name of names) this.#classes.add(name);
  }
  remove(...names) {
    for (const name of names) this.#classes.delete(name);
  }
  contains(name) {
    return this.#classes.has(name);
  }
  toggle(name, force) {
    const next = force === undefined ? !this.#classes.has(name) : force;
    if (next) this.#classes.add(name);
    else this.#classes.delete(name);
    return next;
  }
}

class FakeElement {
  attributes = new Map();
  classList = new FakeClassList();
  dataset = {};
  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }
  hasAttribute(name) {
    return this.attributes.has(name);
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
  }
  removeAttribute(name) {
    this.attributes.delete(name);
  }
  toggleAttribute(name, force) {
    const next = force === undefined ? !this.attributes.has(name) : force;
    if (next) this.attributes.set(name, "");
    else this.attributes.delete(name);
    return next;
  }
}

test("attribute and dataset helpers support map assignment", () => {
  const element = new FakeElement();
  setAttr(element, { role: "button", hidden: "" });
  removeAttr(element, "hidden");
  setData(element, { enabled: "", count: 2 });
  assert.equal(element.getAttribute("role"), "button");
  assert.equal(element.hasAttribute("hidden"), false);
  assert.equal(getBoolData(element, "enabled"), true);
  assert.equal(element.dataset.count, "2");
});

test("declarative attribute parsers stay small and predictable", () => {
  assert.equal(parseBooleanAttribute(""), true);
  assert.equal(parseBooleanAttribute("true"), true);
  assert.equal(parseBooleanAttribute("1"), true);
  assert.equal(parseBooleanAttribute("false"), false);
  assert.deepEqual(parseIntegerListAttribute("1, 2, nope, 4"), [1, 2, 4]);
  assert.deepEqual(parseIntegerListAttribute(null), []);
  assert.equal(parseEnumAttribute("end", ["start", "end"], "start"), "end");
  assert.equal(parseEnumAttribute("other", ["start", "end"], "start"), "start");
});

test("toggleAttr and setData deletion respect native semantics", () => {
  const element = new FakeElement();
  assert.equal(toggleAttr(element, "hidden", true), true);
  assert.equal(toggleAttr(element, "hidden", true), true);
  assert.equal(toggleAttr(element, "hidden", false), false);
  assert.equal(element.hasAttribute("hidden"), false);
  assert.equal(toggleAttr(element, "hidden"), true);

  setData(element, { keep: "", drop: "1" });
  setData(element, "drop", null);
  assert.equal(element.dataset.keep, "");
  assert.equal(element.dataset.drop, undefined);
});

test("class helpers accept space-separated convenience tokens", () => {
  const element = new FakeElement();
  addClass(element, "one two", "three");
  assert.equal(element.classList.contains("two"), true);
  removeClass(element, "one three");
  assert.equal(element.classList.contains("one"), false);
  assert.equal(toggleClass(element, "active", true), true);
});

test("event helpers support arrays, cleanup and CustomEvent detail", () => {
  const target = new EventTarget();
  let calls = 0;
  const cleanup = on(target, ["a", "b"], () => {
    calls += 1;
  });
  target.dispatchEvent(new Event("a"));
  target.dispatchEvent(new Event("b"));
  cleanup();
  target.dispatchEvent(new Event("a"));
  assert.equal(calls, 2);

  let onceCalls = 0;
  once(target, "once", () => {
    onceCalls += 1;
  });
  target.dispatchEvent(new Event("once"));
  target.dispatchEvent(new Event("once"));
  assert.equal(onceCalls, 1);

  let detail;
  target.addEventListener("detail", (event) => {
    detail = event.detail;
  });
  dispatch(target, "detail", { ok: true });
  assert.deepEqual(detail, { ok: true });
});

test("query helpers delegate to a supplied root", () => {
  const first = {};
  const second = {};
  const root = {
    querySelector: (selector) => (selector === ".x" ? first : null),
    querySelectorAll: (selector) => (selector === ".x" ? [first, second] : []),
  };
  assert.equal(qs(".x", root), first);
  assert.deepEqual(qsa(".x", root), [first, second]);

  const doc = { getElementById: (id) => (id === "a" ? first : null) };
  assert.equal(byId("a", doc), first);
});

test("create helpers work with a supplied document and parent", () => {
  const children = [];
  const parent = { appendChild: (child) => children.push(child) };
  const doc = { createElement: (tag) => ({ tag }) };
  const element = ce("div", parent, doc);
  assert.equal(element.tag, "div");
  assert.equal(children[0], element);

  const template = { content: { fragment: true } };
  const htmlDoc = { createElement: () => template };
  assert.equal(parseHTML("<p>x</p>", htmlDoc), template.content);
});

test("insertAfter inserts next to the reference node or throws", () => {
  const parent = { insertBefore: (node, sibling) => parent.inserted.push([node, sibling]) };
  parent.inserted = [];
  const reference = { parentNode: parent, nextSibling: "sibling" };
  const node = {};
  assert.equal(insertAfter(node, reference), node);
  assert.deepEqual(parent.inserted, [[node, "sibling"]]);
  assert.throws(() => insertAfter({}, {}), /has no parent/);
});

test("domReady runs immediately or waits for DOMContentLoaded", () => {
  const doc = { readyState: "loading", listeners: [] };
  doc.addEventListener = (type, cb, opts) => doc.listeners.push({ type, cb, opts });
  doc.removeEventListener = (type, cb) => {
    doc.listeners = doc.listeners.filter((l) => !(l.type === type && l.cb === cb));
  };

  let loaded = false;
  domReady(() => (loaded = true), doc);
  assert.equal(loaded, false);
  assert.equal(doc.listeners.length, 1);
  doc.listeners[0].cb();
  assert.equal(loaded, true);

  let cleaned = 0;
  const cleanupLater = domReady(() => (cleaned += 1), doc);
  cleanupLater();
  assert.equal(doc.listeners.length, 1);
  assert.equal(cleaned, 0);

  let immediate = 0;
  const readyDoc = { readyState: "complete", addEventListener: () => {}, removeEventListener: () => {} };
  const noop = domReady(() => (immediate += 1), readyDoc);
  assert.equal(immediate, 1);
  assert.equal(typeof noop, "function");
});
