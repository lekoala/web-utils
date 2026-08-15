/**
 * @param {string[]} names
 * @returns {string[]}
 */
function classTokens(names) {
  return names.flatMap((name) => name.split(/\s+/).filter(Boolean));
}

/**
 * @param {Element} element
 * @param {string} name
 * @returns {boolean}
 */
export function hasClass(element, name) {
  return element.classList.contains(name);
}

/**
 * @param {Element} element
 * @param {...string} names
 * @returns {Element}
 */
export function addClass(element, ...names) {
  element.classList.add(...classTokens(names));
  return element;
}

/**
 * @param {Element} element
 * @param {...string} names
 * @returns {Element}
 */
export function removeClass(element, ...names) {
  element.classList.remove(...classTokens(names));
  return element;
}

/**
 * @param {Element} element
 * @param {string} name
 * @param {boolean} [force]
 * @returns {boolean}
 */
export function toggleClass(element, name, force) {
  return force === undefined ? element.classList.toggle(name) : element.classList.toggle(name, force);
}
