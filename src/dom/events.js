import { toArray } from "../array.js";

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
export function on(target, types, listener, options) {
  const events = toArray(types);
  for (const type of events) target.addEventListener(type, listener, options);
  return () => off(target, events, listener, options);
}

/**
 * @param {EventTarget} target
 * @param {string | string[]} types
 * @param {EventListenerOrEventListenerObject} listener
 * @param {boolean | EventListenerOptions} [options]
 * @returns {void}
 */
export function off(target, types, listener, options) {
  for (const type of toArray(types)) target.removeEventListener(type, listener, options);
}

/**
 * @param {EventTarget} target
 * @param {string | string[]} types
 * @param {EventListenerOrEventListenerObject} listener
 * @param {AddEventListenerOptions} [options]
 * @returns {() => void}
 */
export function once(target, types, listener, options = {}) {
  return on(target, types, listener, { ...options, once: true });
}

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
export function dispatch(target, type, detail, options = {}) {
  return target.dispatchEvent(new CustomEvent(type, { ...options, detail }));
}
