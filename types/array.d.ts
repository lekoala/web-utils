/**
 * Normalize one value to an array without cloning existing arrays.
 *
 * @template T
 * @param {T | T[]} value
 * @returns {T[]}
 */
export declare function toArray<T>(value: T | T[]): T[];
