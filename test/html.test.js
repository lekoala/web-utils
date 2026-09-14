import { GlobalRegistrator } from "@happy-dom/global-registrator";
import assert from "node:assert/strict";
import test from "node:test";

GlobalRegistrator.register({ url: "http://localhost/" });

const { html } = await import("../src/dom/html.js");

test("html keeps dynamic values out of innerHTML", () => {
  const value = '<img src=x onerror="alert(1)">';
  const fragment = html`<strong>${value}</strong>`;
  const strong = fragment.firstElementChild;

  assert.equal(strong.textContent, value);
  assert.equal(strong.querySelector("img"), null);
});

test("html composes nodes, fragments and nested iterables", () => {
  const icon = document.createElement("i");
  icon.textContent = "*";
  const items = ["one", "two"];

  const fragment = html`
    <div>
      ${icon}
      ${items.map((item) => html`<span>${item}</span>`)}
      ${null}
      ${false}
    </div>
  `;

  const div = fragment.firstElementChild;
  assert.equal(div.querySelector("i"), icon);
  assert.deepEqual(
    [...div.querySelectorAll("span")].map((node) => node.textContent),
    ["one", "two"],
  );
});

test("html.one returns one element and ignores surrounding whitespace", () => {
  const button = html.one`
    <button>${"Save"}</button>
  `;

  assert.equal(button.localName, "button");
  assert.equal(button.textContent, "Save");
});

test("html.one rejects multiple roots and text roots", () => {
  assert.throws(() => html.one`<span>A</span><span>B</span>`, /exactly one root element/);
  assert.throws(() => html.one`hello <span>A</span>`, /exactly one root element/);
});

test("html rejects interpolations in attributes", () => {
  assert.throws(() => html`<div class="${"x"}"></div>`, /only supported in child content/);
});

test("html rejects interpolations in raw-text elements", () => {
  assert.throws(() => html`<style>${"body { color: red; }"}</style>`, /only supported in child content/);
});

test("html templates are reusable with different values", () => {
  function row(value) {
    return html.one`<span>${value}</span>`;
  }

  assert.equal(row("A").textContent, "A");
  assert.equal(row("B").textContent, "B");
});

test.after(async () => {
  await GlobalRegistrator.unregister();
});
