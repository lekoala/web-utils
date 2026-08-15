/**
 * Convert FormData to a plain object while preserving duplicate keys as arrays.
 *
 * @param {FormData} formData
 * @returns {Record<string, FormDataEntryValue | FormDataEntryValue[]>}
 */
export function formDataToObject(formData) {
  /** @type {Record<string, FormDataEntryValue | FormDataEntryValue[]>} */
  const result = {};

  for (const [key, value] of formData) {
    if (!Object.hasOwn(result, key)) {
      Object.defineProperty(result, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
      continue;
    }

    const current = result[key];
    result[key] = Array.isArray(current) ? [...current, value] : [current, value];
  }

  return result;
}
