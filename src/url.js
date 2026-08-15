/**
 * @typedef {string | number | boolean | null | undefined} QueryScalar
 * @typedef {QueryScalar | QueryScalar[] | Record<string, QueryScalar>} QueryValue
 */

/**
 * Append object values to a URL's search params.
 * Arrays use repeated keys; object values use bracket notation.
 * Undefined values are skipped. The URL is mutated and returned.
 *
 * @param {URL} url
 * @param {Record<string, QueryValue>} [params]
 * @returns {URL}
 */
export function appendParams(url, params = {}) {
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined) url.searchParams.append(key, String(item ?? ""));
      }
      continue;
    }

    if (value !== null && typeof value === "object") {
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        if (nestedValue !== undefined) {
          url.searchParams.append(`${key}[${nestedKey}]`, String(nestedValue ?? ""));
        }
      }
      continue;
    }

    url.searchParams.append(key, String(value ?? ""));
  }

  return url;
}

/**
 * Test whether a URL points to a different origin.
 * Browser-only at call time when `base` is omitted (defaults to `location.href`);
 * pass `base` explicitly in SSR/non-browser code.
 *
 * @param {string | URL} input
 * @param {string | URL} [base]
 * @returns {boolean}
 */
export function isExternalUrl(input, base = globalThis.location?.href) {
  if (!base) throw new TypeError("A base URL is required outside a browser");
  return new URL(input, base).origin !== new URL(base).origin;
}
