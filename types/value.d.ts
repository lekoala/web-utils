/**
 * Parse the common HTML/config representations of a boolean.
 * Empty strings are intentionally false; data attributes that treat an empty
 * value as true should use getBoolData().
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function toBool(value: unknown): boolean;
/**
 * @param {string | number | undefined | null} value
 * @param {number} [fallback]
 * @returns {number}
 */
export function toInt(value: string | number | undefined | null, fallback?: number): number;
/**
 * @param {string | number | undefined | null} value
 * @param {number} [fallback]
 * @returns {number}
 */
export function toFloat(value: string | number | undefined | null, fallback?: number): number;
/**
 * Convert a simple string config value to its obvious primitive type.
 * Numeric conversion is deliberately conservative: the full string must be
 * a finite number.
 *
 * @param {unknown} value
 * @returns {unknown}
 */
export function stringToValue(value: unknown): unknown;
