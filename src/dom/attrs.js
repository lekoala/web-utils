import { toBool } from "../value.js";

/**
 * @param {Element} element
 * @param {string} name
 * @returns {string | null}
 */
export function getAttr(element, name) {
  return element.getAttribute(name);
}

/**
 * @param {Element} element
 * @param {string} name
 * @returns {boolean}
 */
export function hasAttr(element, name) {
  return element.hasAttribute(name);
}

/**
 * Set one attribute or a map of attributes.
 * Null/undefined values remove the attribute.
 *
 * @param {Element} element
 * @param {string | Record<string, unknown>} name
 * @param {unknown} [value]
 * @returns {Element}
 */
export function setAttr(element, name, value) {
  /** @type {[string, unknown][]} */
  const entries = typeof name === "string" ? [[name, value]] : Object.entries(name);
  for (const [key, item] of entries) {
    if (item == null) element.removeAttribute(key);
    else element.setAttribute(key, String(item));
  }
  return element;
}

/**
 * @param {Element} element
 * @param {string | string[]} names
 * @returns {Element}
 */
export function removeAttr(element, names) {
  for (const name of Array.isArray(names) ? names : [names]) element.removeAttribute(name);
  return element;
}

/**
 * @param {Element} element
 * @param {string} name
 * @param {boolean} [force]
 * @returns {boolean}
 */
export function toggleAttr(element, name, force) {
  return force === undefined ? element.toggleAttribute(name) : element.toggleAttribute(name, force);
}

/**
 * Parse the common declarative boolean-attribute spellings.
 * A bare attribute, "true" and "1" are true; everything else is false.
 * Missing attributes should normally be handled with hasAttr() first when
 * absence and false need to stay distinct.
 *
 * @param {string | null | undefined} value
 * @returns {boolean}
 */
export function parseBooleanAttribute(value) {
  return value === "" || value === "true" || value === "1";
}

/**
 * Parse a comma-separated list of integers, dropping empty and invalid entries.
 *
 * @param {string | null | undefined} value
 * @returns {number[]}
 */
export function parseIntegerListAttribute(value) {
  if (value == null || value === "") return [];
  return String(value)
    .split(",")
    .map((item) => Number.parseInt(item.trim(), 10))
    .filter((item) => Number.isFinite(item));
}

/**
 * Validate a declarative string value against an allow-list.
 *
 * @template {string} T
 * @param {string | null | undefined} value
 * @param {readonly T[]} allowed
 * @param {T} fallback
 * @returns {T}
 */
export function parseEnumAttribute(value, allowed, fallback) {
  return allowed.includes(/** @type {T} */ (value)) ? /** @type {T} */ (value) : fallback;
}

/**
 * @param {HTMLElement} element
 * @param {string} name camelCase dataset key
 * @returns {string | undefined}
 */
export function getData(element, name) {
  return element.dataset[name];
}

/**
 * @param {HTMLElement} element
 * @param {string} name camelCase dataset key
 * @returns {boolean}
 */
export function hasData(element, name) {
  return element.dataset[name] !== undefined;
}

/**
 * Empty data attributes count as true, matching common opt-in markup such as data-auto.
 *
 * @param {HTMLElement} element
 * @param {string} name camelCase dataset key
 * @returns {boolean}
 */
export function getBoolData(element, name) {
  const value = element.dataset[name];
  return value === "" || toBool(value);
}

/**
 * Set one dataset entry or a map of entries.
 * Null/undefined values remove the entry.
 *
 * @param {HTMLElement} element
 * @param {string | Record<string, unknown>} name
 * @param {unknown} [value]
 * @returns {HTMLElement}
 */
export function setData(element, name, value) {
  /** @type {[string, unknown][]} */
  const entries = typeof name === "string" ? [[name, value]] : Object.entries(name);
  for (const [key, item] of entries) {
    if (item == null) delete element.dataset[key];
    else element.dataset[key] = String(item);
  }
  return element;
}
