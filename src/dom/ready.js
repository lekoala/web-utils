/**
 * Run a callback once the document is parsed.
 * Module/defer scripts generally do not need this helper.
 *
 * @param {() => void} callback
 * @param {Document} [doc]
 * @returns {() => void} cleanup function when waiting, otherwise a no-op
 */
export function domReady(callback, doc = document) {
  if (doc.readyState !== "loading") {
    callback();
    return () => {};
  }

  doc.addEventListener("DOMContentLoaded", callback, { once: true });
  return () => doc.removeEventListener("DOMContentLoaded", callback);
}
