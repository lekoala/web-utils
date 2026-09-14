/**
 * Run a callback once the document is parsed.
 * Module/defer scripts generally do not need this helper.
 *
 * @param {() => void} callback
 * @param {Document} [doc]
 * @returns {() => void} cleanup function when waiting, otherwise a no-op
 */
export declare function domReady(callback: () => void, doc?: Document): () => void;
