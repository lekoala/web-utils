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
export declare function camelize(value: string): string;
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
export declare function dashToCamel(value: string): string;
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
export declare function camelToDash(value: string): string;
/**
 * Replace {key} placeholders with values from a flat object.
 * Unknown placeholders are preserved by default.
 *
 * @param {string} template
 * @param {Record<string, unknown>} values
 * @param {{ missing?: "keep" | "empty" }} [options]
 * @returns {string}
 */
export declare function interpolate(template: string, values: Record<string, unknown>, options?: {
    missing?: "keep" | "empty";
}): string;
/**
 * Remove combining diacritic marks while keeping the rest of the string.
 *
 * @param {string} value
 * @returns {string}
 */
export declare function stripDiacritics(value: string): string;
/**
 * @param {string} value
 * @returns {string}
 */
export declare function slugify(value: string): string;
