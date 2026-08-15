/**
 * Add one listener to one or more event types.
 * No event is made passive implicitly: callers keep full control over preventDefault().
 * Returns a cleanup function for component teardown.
 *
 * @param {EventTarget} target
 * @param {string | string[]} types
 * @param {EventListenerOrEventListenerObject} listener
 * @param {boolean | AddEventListenerOptions} [options]
 * @returns {() => void}
 */
export function on(target: EventTarget, types: string | string[], listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): () => void;
/**
 * @param {EventTarget} target
 * @param {string | string[]} types
 * @param {EventListenerOrEventListenerObject} listener
 * @param {boolean | EventListenerOptions} [options]
 * @returns {void}
 */
export function off(target: EventTarget, types: string | string[], listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
/**
 * @param {EventTarget} target
 * @param {string | string[]} types
 * @param {EventListenerOrEventListenerObject} listener
 * @param {AddEventListenerOptions} [options]
 * @returns {() => void}
 */
export function once(target: EventTarget, types: string | string[], listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): () => void;
/**
 * Dispatch a CustomEvent and return EventTarget.dispatchEvent()'s boolean result.
 *
 * @template T
 * @param {EventTarget} target
 * @param {string} type
 * @param {T} [detail]
 * @param {Omit<CustomEventInit<T>, "detail">} [options]
 * @returns {boolean}
 */
export function dispatch<T>(target: EventTarget, type: string, detail?: T, options?: Omit<CustomEventInit<T>, "detail">): boolean;
