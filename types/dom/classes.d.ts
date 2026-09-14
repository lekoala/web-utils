/**
 * @param {Element} element
 * @param {string} name
 * @returns {boolean}
 */
export declare function hasClass(element: Element, name: string): boolean;
/**
 * @param {Element} element
 * @param {...string} names
 * @returns {Element}
 */
export declare function addClass(element: Element, ...names: string[]): Element;
/**
 * @param {Element} element
 * @param {...string} names
 * @returns {Element}
 */
export declare function removeClass(element: Element, ...names: string[]): Element;
/**
 * @param {Element} element
 * @param {string} name
 * @param {boolean} [force]
 * @returns {boolean}
 */
export declare function toggleClass(element: Element, name: string, force?: boolean): boolean;
