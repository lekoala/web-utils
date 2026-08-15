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
export function ce(tagName, parent = null, doc = document) {
  const element = doc.createElement(tagName);
  parent?.appendChild(element);
  return element;
}

/**
 * @template {Node} T
 * @param {T} node
 * @param {Node} reference
 * @returns {T}
 */
export function insertAfter(node, reference) {
  if (!reference.parentNode) throw new TypeError("Reference node has no parent");
  reference.parentNode.insertBefore(node, reference.nextSibling);
  return node;
}

/**
 * Parse an HTML string into a detached DocumentFragment.
 * Browser-only at call time when `doc` is omitted (defaults to `document`).
 *
 * @param {string} html
 * @param {Document} [doc]
 * @returns {DocumentFragment}
 */
export function parseHTML(html, doc = document) {
  const template = doc.createElement("template");
  template.innerHTML = html;
  return template.content;
}
