import assert from "node:assert/strict";
import test from "node:test";
import { formDataToObject } from "../src/form.js";

test("formDataToObject keeps scalars and turns duplicates into arrays", () => {
  const formData = new FormData();
  formData.append("name", "Ada");
  formData.append("tag", "a");
  formData.append("tag", "b");
  const result = formDataToObject(formData);
  assert.equal(result.name, "Ada");
  assert.deepEqual(result.tag, ["a", "b"]);
});

test("formDataToObject handles three or more duplicates", () => {
  const formData = new FormData();
  formData.append("tag", "a");
  formData.append("tag", "b");
  formData.append("tag", "c");
  assert.deepEqual(formDataToObject(formData).tag, ["a", "b", "c"]);
});

test("formDataToObject preserves __proto__ as an own property", () => {
  const formData = new FormData();
  formData.append("__proto__", "x");
  const result = formDataToObject(formData);
  assert.equal(Object.hasOwn(result, "__proto__"), true);
  assert.equal(Object.getPrototypeOf(result), Object.prototype);
});
