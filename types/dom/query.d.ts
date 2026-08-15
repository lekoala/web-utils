/**
 * @template {keyof HTMLElementTagNameMap} K
 * @overload
 * @param {K} selector
 * @param {ParentNode} [root]
 * @returns {HTMLElementTagNameMap[K] | null}
 */
export function qs<K extends keyof HTMLElementTagNameMap>(selector: K, root?: ParentNode | undefined): HTMLElementTagNameMap[K] | null;
/**
 * @overload
 * @param {string} selector
 * @param {ParentNode} [root]
 * @returns {Element | null}
 */
export function qs(selector: string, root?: ParentNode | undefined): Element | null;
/**
 * @template {keyof HTMLElementTagNameMap} K
 * @overload
 * @param {K} selector
 * @param {ParentNode} [root]
 * @returns {HTMLElementTagNameMap[K][]}
 */
export function qsa<K extends keyof HTMLElementTagNameMap>(selector: K, root?: ParentNode | undefined): HTMLElementTagNameMap[K][];
/**
 * @overload
 * @param {string} selector
 * @param {ParentNode} [root]
 * @returns {Element[]}
 */
export function qsa(selector: string, root?: ParentNode | undefined): Element[];
/**
 * @param {string} id
 * @param {Document} [root]
 * @returns {HTMLElement | null}
 */
export function byId(id: string, root?: Document): HTMLElement | null;
