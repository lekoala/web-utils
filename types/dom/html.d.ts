/**
 * Minimal safe HTML tagged template.
 *
 * @type {typeof htmlTag & { one: typeof htmlOne }}
 */
export const html: typeof htmlTag & {
    one: typeof htmlOne;
};
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
declare function htmlTag(strings: TemplateStringsArray, ...values: unknown[]): DocumentFragment;
/**
 * Create exactly one root Element. Whitespace and comments around that element
 * are ignored; any other sibling content is rejected.
 *
 * @param {TemplateStringsArray} strings
 * @param {...unknown} values
 * @returns {Element}
 */
declare function htmlOne(strings: TemplateStringsArray, ...values: unknown[]): Element;
export {};
