export declare function qs<K extends keyof HTMLElementTagNameMap>(selector: K, root?: ParentNode): HTMLElementTagNameMap[K] | null;
export declare function qs(selector: string, root?: ParentNode): Element | null;
export declare function qsa<K extends keyof HTMLElementTagNameMap>(selector: K, root?: ParentNode): HTMLElementTagNameMap[K][];
export declare function qsa(selector: string, root?: ParentNode): Element[];
/**
 * @param {string} id
 * @param {Document} [root]
 * @returns {HTMLElement | null}
 */
export declare function byId(id: string, root?: Document): HTMLElement | null;
