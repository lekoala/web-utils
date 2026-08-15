/**
 * Parse the common HTML/config representations of a boolean.
 * Empty strings are intentionally false; data attributes that treat an empty
 * value as true should use getBoolData().
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function toBool(value) {
  if (value === true || value === 1) return true;
  if (value === false || value === 0 || value == null) return false;
  return ["true", "1"].includes(String(value).toLowerCase());
}

/**
 * @param {string | number | undefined | null} value
 * @param {number} [fallback]
 * @returns {number}
 */
export function toInt(value, fallback = 0) {
  if (value == null || value === "") return fallback;
  const parsed = Number.parseInt(String(value), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * @param {string | number | undefined | null} value
 * @param {number} [fallback]
 * @returns {number}
 */
export function toFloat(value, fallback = 0) {
  if (value == null || value === "") return fallback;
  const parsed = Number.parseFloat(String(value));
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * Convert a simple string config value to its obvious primitive type.
 * Numeric conversion is deliberately conservative: the full string must be
 * a finite number.
 *
 * @param {unknown} value
 * @returns {unknown}
 */
export function stringToValue(value) {
  if (typeof value !== "string") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (value === "") return value;

  const number = Number(value);
  return Number.isFinite(number) && String(number) === value ? number : value;
}
