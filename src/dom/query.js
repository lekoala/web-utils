/**
 * @template {keyof HTMLElementTagNameMap} K
 * @overload
 * @param {K} selector
 * @param {ParentNode} [root]
 * @returns {HTMLElementTagNameMap[K] | null}
 */
/**
 * @overload
 * @param {string} selector
 * @param {ParentNode} [root]
 * @returns {Element | null}
 */
/**
 * Query one element. The tag-name overload keeps native element inference for qs("input").
 *
 * @param {string} selector
 * @param {ParentNode} [root]
 * @returns {Element | null}
 */
export function qs(selector, root = document) {
  return root.querySelector(selector);
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @overload
 * @param {K} selector
 * @param {ParentNode} [root]
 * @returns {HTMLElementTagNameMap[K][]}
 */
/**
 * @overload
 * @param {string} selector
 * @param {ParentNode} [root]
 * @returns {Element[]}
 */
/**
 * Query elements and return a real array.
 *
 * @param {string} selector
 * @param {ParentNode} [root]
 * @returns {Element[]}
 */
export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

/**
 * @param {string} id
 * @param {Document} [root]
 * @returns {HTMLElement | null}
 */
export function byId(id, root = document) {
  return root.getElementById(id);
}
