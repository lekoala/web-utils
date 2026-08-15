/**
 * @param {Element} element
 * @param {string} name
 * @returns {boolean}
 */
export function hasClass(element: Element, name: string): boolean;
/**
 * @param {Element} element
 * @param {...string} names
 * @returns {Element}
 */
export function addClass(element: Element, ...names: string[]): Element;
/**
 * @param {Element} element
 * @param {...string} names
 * @returns {Element}
 */
export function removeClass(element: Element, ...names: string[]): Element;
/**
 * @param {Element} element
 * @param {string} name
 * @param {boolean} [force]
 * @returns {boolean}
 */
export function toggleClass(element: Element, name: string, force?: boolean): boolean;
