/**
 * Convert words separated by any run of non-alphanumeric characters to lower camel case.
 *
 * A trailing separator with no following letter is preserved.
 *
 * @example
 * camelize("foo-bar"); // "fooBar"
 * camelize("foo_bar"); // "fooBar"
 * camelize("foo.bar"); // "fooBar"
 * camelize("URL value"); // "urlValue"
 * camelize("hello-"); // "hello-"
 *
 * @param {string} value
 * @returns {string}
 */
export function camelize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+(.)/gi, (_match, chr) => chr.toUpperCase());
}

/**
 * Convert `-` followed by a lowercase letter or digit to camel case.
 * Uppercase after a dash, `_`, or `.` are left untouched.
 *
 * @example
 * dashToCamel("foo-bar"); // "fooBar"
 * dashToCamel("foo-BAR"); // "foo-BAR"
 * dashToCamel("foo_bar"); // "foo_bar"
 *
 * @param {string} value
 * @returns {string}
 */
export function dashToCamel(value) {
  return value.replace(/-([a-z0-9])/g, (_match, chr) => chr.toUpperCase());
}

/**
 * Convert camel case to dash case.
 * A `-` is inserted before each uppercase letter preceded by a lowercase letter or
 * digit, then the whole string is lowercased. Leading acronyms are not split.
 *
 * @example
 * camelToDash("fooBar"); // "foo-bar"
 * camelToDash("fooBAR"); // "foo-bar"
 * camelToDash("URLValue"); // "urlvalue"
 *
 * @param {string} value
 * @returns {string}
 */
export function camelToDash(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Replace {key} placeholders with values from a flat object.
 * Unknown placeholders are preserved by default.
 *
 * @param {string} template
 * @param {Record<string, unknown>} values
 * @param {{ missing?: "keep" | "empty" }} [options]
 * @returns {string}
 */
export function interpolate(template, values, options = {}) {
  const missing = options.missing ?? "keep";
  return template.replace(/\{([^{}]+)\}/g, (placeholder, key) => {
    if (!Object.hasOwn(values, key)) return missing === "empty" ? "" : placeholder;
    return String(values[key] ?? "");
  });
}

/**
 * Remove combining diacritic marks while keeping the rest of the string.
 *
 * @param {string} value
 * @returns {string}
 */
export function stripDiacritics(value) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

/**
 * @param {string} value
 * @returns {string}
 */
export function slugify(value) {
  return stripDiacritics(value)
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}
