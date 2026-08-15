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
export function appendParams(url: URL, params?: Record<string, QueryValue>): URL;
/**
 * Test whether a URL points to a different origin.
 * Browser-only at call time when `base` is omitted (defaults to `location.href`);
 * pass `base` explicitly in SSR/non-browser code.
 *
 * @param {string | URL} input
 * @param {string | URL} [base]
 * @returns {boolean}
 */
export function isExternalUrl(input: string | URL, base?: string | URL): boolean;
export type QueryScalar = string | number | boolean | null | undefined;
export type QueryValue = QueryScalar | QueryScalar[] | Record<string, QueryScalar>;
