/**
 * @typedef {((...args: any[]) => void) & { cancel: () => void }} CancelableFunction
 */
/**
 * @typedef {((...args: any[]) => void) & { cancel: () => void, flush: () => void }} DebouncedFunction
 */
/**
 * Run only after calls have stopped for `delay` ms.
 * `cancel()` drops a pending invocation; `flush()` runs it immediately.
 *
 * @param {(...args: any[]) => void} fn
 * @param {number} [delay]
 * @returns {DebouncedFunction}
 */
export function debounce(fn: (...args: any[]) => void, delay?: number): DebouncedFunction;
/**
 * Run immediately, then ignore calls until the quiet period has elapsed.
 *
 * @param {(...args: any[]) => void} fn
 * @param {number} [delay]
 * @returns {CancelableFunction}
 */
export function debounceLeading(fn: (...args: any[]) => void, delay?: number): CancelableFunction;
/**
 * Run at most once per interval. The first call runs immediately.
 *
 * @param {(...args: any[]) => void} fn
 * @param {number} [interval]
 * @returns {(...args: any[]) => void}
 */
export function throttle(fn: (...args: any[]) => void, interval?: number): (...args: any[]) => void;
/**
 * Collapse repeated calls into the next animation frame.
 * The browser APIs are resolved at call time, so importing this module is SSR-safe.
 *
 * @param {(...args: any[]) => void} fn
 * @returns {CancelableFunction}
 */
export function debounceFrame(fn: (...args: any[]) => void): CancelableFunction;
export type CancelableFunction = ((...args: any[]) => void) & {
    cancel: () => void;
};
export type DebouncedFunction = ((...args: any[]) => void) & {
    cancel: () => void;
    flush: () => void;
};
