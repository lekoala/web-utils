/**
 * Define a custom element only when the registry is available and the name is free.
 * Importing this module is SSR-safe.
 *
 * @param {string} name
 * @param {CustomElementConstructor} ctor
 * @param {CustomElementRegistry | undefined} [registry]
 * @returns {boolean} true when a definition was registered
 */
export function defineCustomElement(name: string, ctor: CustomElementConstructor, registry?: CustomElementRegistry | undefined): boolean;
