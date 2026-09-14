import assert from "node:assert/strict";
import test from "node:test";
import { html } from "@lekoala/web-utils/dom/html";
import { on } from "@lekoala/web-utils/dom/events";
import { qs } from "@lekoala/web-utils/dom/query";
import { debounce } from "@lekoala/web-utils/timing";

test("documented package subpaths resolve through exports", () => {
  assert.equal(typeof debounce, "function");
  assert.equal(typeof on, "function");
  assert.equal(typeof qs, "function");
  assert.equal(typeof html, "function");
  assert.equal(typeof html.one, "function");
});

test("the package intentionally has no root barrel", async () => {
  await assert.rejects(import("@lekoala/web-utils"), { code: "ERR_PACKAGE_PATH_NOT_EXPORTED" });
});
