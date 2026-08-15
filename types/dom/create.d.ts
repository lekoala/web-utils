/**
 * Create an HTML element, optionally appending it to a parent.
 * Browser-only at call time when `doc` is omitted (defaults to `document`).
 *
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName
 * @param {Node | null} [parent]
 * @param {Document} [doc]
 * @returns {HTMLElementTagNameMap[K]}
 */
export function ce<K extends keyof HTMLElementTagNameMap>(tagName: K, parent?: Node | null, doc?: Document): HTMLElementTagNameMap[K];
/**
 * @template {Node} T
 * @param {T} node
 * @param {Node} reference
 * @returns {T}
 */
export function insertAfter<T extends Node>(node: T, reference: Node): T;
/**
 * Parse an HTML string into a detached DocumentFragment.
 * Browser-only at call time when `doc` is omitted (defaults to `document`).
 *
 * @param {string} html
 * @param {Document} [doc]
 * @returns {DocumentFragment}
 */
export function parseHTML(html: string, doc?: Document): DocumentFragment;
