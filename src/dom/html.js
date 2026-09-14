const MARKER = "web-utils-hole:";
const templateCache = new WeakMap();

/**
 * @param {unknown} value
 * @returns {value is Iterable<unknown>}
 */
function isIterable(value) {
  if (value == null || typeof value === "string") return false;
  return typeof (/** @type {{ [Symbol.iterator]?: unknown }} */ (value)[Symbol.iterator]) === "function";
}

/**
 * @param {DocumentFragment} parent
 * @param {unknown} value
 * @returns {void}
 */
function appendValue(parent, value) {
  if (value == null || value === false) return;
  if (value instanceof Node) {
    parent.append(value);
  } else if (isIterable(value)) {
    for (const item of value) appendValue(parent, item);
  } else {
    parent.append(parent.ownerDocument.createTextNode(String(value)));
  }
}

/**
 * @param {TemplateStringsArray} strings
 * @returns {HTMLTemplateElement}
 */
function compile(strings) {
  let template = templateCache.get(strings);
  if (template) return template;

  template = document.createElement("template");
  template.innerHTML = strings
    .map((part, index) => `${part}${index < strings.length - 1 ? `<!--${MARKER}${index}-->` : ""}`)
    .join("");
  templateCache.set(strings, template);
  return template;
}

/**
 * Create a detached DocumentFragment from static HTML plus safe dynamic child content.
 * Dynamic values never enter `innerHTML`: they are inserted afterwards as text or DOM.
 *
 * Interpolations are intentionally supported only in normal child-content positions,
 * not inside tags, attributes or raw-text elements such as script/style/textarea.
 *
 * @param {TemplateStringsArray} strings
 * @param {...unknown} values
 * @returns {DocumentFragment}
 */
function htmlTag(strings, ...values) {
  const fragment = /** @type {DocumentFragment} */ (compile(strings).content.cloneNode(true));
  const walker = fragment.ownerDocument.createTreeWalker(fragment, NodeFilter.SHOW_COMMENT);
  /** @type {Comment[]} */
  const holes = [];

  while (walker.nextNode()) {
    const node = /** @type {Comment} */ (walker.currentNode);
    if (node.data.startsWith(MARKER)) holes.push(node);
  }

  if (holes.length !== values.length) {
    throw new TypeError("html interpolations are only supported in child content");
  }

  for (const hole of holes) {
    const content = hole.ownerDocument.createDocumentFragment();
    appendValue(content, values[Number(hole.data.slice(MARKER.length))]);
    hole.replaceWith(content);
  }

  return fragment;
}

/**
 * Create exactly one root Element. Whitespace and comments around that element
 * are ignored; any other sibling content is rejected.
 *
 * @param {TemplateStringsArray} strings
 * @param {...unknown} values
 * @returns {Element}
 */
function htmlOne(strings, ...values) {
  const fragment = htmlTag(strings, ...values);
  const nodes = [...fragment.childNodes].filter((node) => {
    if (node.nodeType === Node.COMMENT_NODE) return false;
    return node.nodeType !== Node.TEXT_NODE || Boolean(node.textContent?.trim());
  });

  if (nodes.length !== 1 || !(nodes[0] instanceof Element)) {
    throw new TypeError("html.one expects exactly one root element");
  }

  return nodes[0];
}

/**
 * Minimal safe HTML tagged template.
 *
 * @type {typeof htmlTag & { one: typeof htmlOne }}
 */
export const html = Object.assign(htmlTag, { one: htmlOne });
