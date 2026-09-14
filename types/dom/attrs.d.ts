/**
 * @param {Element} element
 * @param {string} name
 * @returns {string | null}
 */
export function getAttr(element: Element, name: string): string | null;
/**
 * @param {Element} element
 * @param {string} name
 * @returns {boolean}
 */
export function hasAttr(element: Element, name: string): boolean;
/**
 * Set one attribute or a map of attributes.
 * Null/undefined values remove the attribute.
 *
 * @param {Element} element
 * @param {string | Record<string, unknown>} name
 * @param {unknown} [value]
 * @returns {Element}
 */
export function setAttr(element: Element, name: string | Record<string, unknown>, value?: unknown): Element;
/**
 * @param {Element} element
 * @param {string | string[]} names
 * @returns {Element}
 */
export function removeAttr(element: Element, names: string | string[]): Element;
/**
 * @param {Element} element
 * @param {string} name
 * @param {boolean} [force]
 * @returns {boolean}
 */
export function toggleAttr(element: Element, name: string, force?: boolean): boolean;
/**
 * Parse the common declarative boolean-attribute spellings.
 * A bare attribute, "true" and "1" are true; everything else is false.
 * Missing attributes should normally be handled with hasAttr() first when
 * absence and false need to stay distinct.
 *
 * @param {string | null | undefined} value
 * @returns {boolean}
 */
export function parseBooleanAttribute(value: string | null | undefined): boolean;
/**
 * Parse a comma-separated list of integers, dropping empty and invalid entries.
 *
 * @param {string | null | undefined} value
 * @returns {number[]}
 */
export function parseIntegerListAttribute(value: string | null | undefined): number[];
/**
 * Validate a declarative string value against an allow-list.
 *
 * @template {string} T
 * @param {string | null | undefined} value
 * @param {readonly T[]} allowed
 * @param {T} fallback
 * @returns {T}
 */
export function parseEnumAttribute<T extends string>(value: string | null | undefined, allowed: readonly T[], fallback: T): T;
/**
 * @param {HTMLElement} element
 * @param {string} name camelCase dataset key
 * @returns {string | undefined}
 */
export function getData(element: HTMLElement, name: string): string | undefined;
/**
 * @param {HTMLElement} element
 * @param {string} name camelCase dataset key
 * @returns {boolean}
 */
export function hasData(element: HTMLElement, name: string): boolean;
/**
 * Empty data attributes count as true, matching common opt-in markup such as data-auto.
 *
 * @param {HTMLElement} element
 * @param {string} name camelCase dataset key
 * @returns {boolean}
 */
export function getBoolData(element: HTMLElement, name: string): boolean;
/**
 * Set one dataset entry or a map of entries.
 * Null/undefined values remove the entry.
 *
 * @param {HTMLElement} element
 * @param {string | Record<string, unknown>} name
 * @param {unknown} [value]
 * @returns {HTMLElement}
 */
export function setData(element: HTMLElement, name: string | Record<string, unknown>, value?: unknown): HTMLElement;
