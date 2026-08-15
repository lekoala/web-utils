import assert from "node:assert/strict";
import test from "node:test";
import { toArray } from "../src/array.js";
import { camelize, camelToDash, dashToCamel, interpolate, slugify, stripDiacritics } from "../src/string.js";
import { debounce, debounceLeading, throttle } from "../src/timing.js";
import { appendParams, isExternalUrl } from "../src/url.js";
import { stringToValue, toBool, toFloat, toInt } from "../src/value.js";

test("toArray keeps arrays and wraps scalars", () => {
  const array = [1, 2];
  assert.equal(toArray(array), array);
  assert.deepEqual(toArray("x"), ["x"]);
});

test("string helpers cover existing project conventions", () => {
  assert.equal(camelize("hello-world value"), "helloWorldValue");
  assert.equal(camelToDash("helloWorld"), "hello-world");
  assert.equal(dashToCamel("hello-world"), "helloWorld");
  assert.equal(interpolate("Hello {name} {missing}", { name: "Ada" }), "Hello Ada {missing}");
  assert.equal(slugify("Déjà Vu!"), "deja-vu");
});

test("string case helpers match the documented edge cases", () => {
  assert.equal(camelize("foo-bar"), "fooBar");
  assert.equal(camelize("foo_bar"), "fooBar");
  assert.equal(camelize("foo.bar"), "fooBar");
  assert.equal(camelize("URL value"), "urlValue");
  assert.equal(camelize("hello-"), "hello-");

  assert.equal(dashToCamel("foo-BAR"), "foo-BAR");
  assert.equal(dashToCamel("foo_bar"), "foo_bar");

  assert.equal(camelToDash("fooBAR"), "foo-bar");
  assert.equal(camelToDash("URLValue"), "urlvalue");
  assert.equal(camelToDash("fooBarURL"), "foo-bar-url");
});

test("interpolate replaces unknown placeholders with empty when requested", () => {
  const values = { name: "Ada" };
  assert.equal(interpolate("Hello {name} {missing}", values, { missing: "empty" }), "Hello Ada ");
  assert.equal(interpolate("Hello {name}", values, { missing: "empty" }), "Hello Ada");
});

test("stripDiacritics removes combining marks while keeping letters", () => {
  assert.equal(stripDiacritics("Déjà Vu"), "Deja Vu");
  assert.equal(stripDiacritics("Grüße"), "Gruße");
});

test("value helpers are conservative", () => {
  assert.equal(toBool("TRUE"), true);
  assert.equal(toBool("false"), false);
  assert.equal(toInt("12"), 12);
  assert.equal(toInt("nope", 7), 7);
  assert.equal(toFloat("1.5"), 1.5);
  assert.equal(stringToValue("42"), 42);
  assert.equal(stringToValue("042"), "042");
});

test("value helpers keep unexpected input conservative", () => {
  assert.equal(toBool(""), false);
  assert.equal(toBool("yes"), false);
  assert.equal(toBool(undefined), false);
  assert.equal(stringToValue("false"), false);
  assert.equal(stringToValue("null"), null);
  assert.equal(stringToValue(""), "");
  assert.equal(stringToValue("1e3"), "1e3");
  assert.equal(stringToValue(42), 42);
});

test("appendParams supports scalars, arrays and bracket objects", () => {
  const url = new URL("https://example.test/path");
  appendParams(url, {
    page: 2,
    tag: ["a", "b"],
    filter: { status: "open" },
    skip: undefined,
  });
  assert.equal(url.searchParams.get("page"), "2");
  assert.deepEqual(url.searchParams.getAll("tag"), ["a", "b"]);
  assert.equal(url.searchParams.get("filter[status]"), "open");
  assert.equal(url.searchParams.has("skip"), false);
});

test("isExternalUrl uses URL origins", () => {
  const base = "https://example.test/a";
  assert.equal(isExternalUrl("/b", base), false);
  assert.equal(isExternalUrl("https://other.test/b", base), true);
});

test("debounce keeps only the last call", async () => {
  const calls = [];
  const fn = debounce((value) => calls.push(value), 5);
  fn(1);
  fn(2);
  await new Promise((resolve) => setTimeout(resolve, 15));
  assert.deepEqual(calls, [2]);
});

test("debounceLeading runs the first call in a burst", async () => {
  const calls = [];
  const fn = debounceLeading((value) => calls.push(value), 5);
  fn(1);
  fn(2);
  await new Promise((resolve) => setTimeout(resolve, 10));
  fn(3);
  assert.deepEqual(calls, [1, 3]);
});

test("throttle runs at most once per interval", () => {
  const calls = [];
  const fn = throttle((value) => calls.push(value), 1000);
  fn(1);
  fn(2);
  assert.deepEqual(calls, [1]);
});
