/**
 * Convert FormData to a plain object while preserving duplicate keys as arrays.
 *
 * @param {FormData} formData
 * @returns {Record<string, FormDataEntryValue | FormDataEntryValue[]>}
 */
export function formDataToObject(formData: FormData): Record<string, FormDataEntryValue | FormDataEntryValue[]>;
