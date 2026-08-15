/**
 * Normalize one value to an array without cloning existing arrays.
 *
 * @template T
 * @param {T | T[]} value
 * @returns {T[]}
 */
export function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
