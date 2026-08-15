/**
 * @typedef {((...args: any[]) => void) & { cancel: () => void }} CancelableFunction
 */

/**
 * Run only after calls have stopped for `delay` ms.
 *
 * @param {(...args: any[]) => void} fn
 * @param {number} [delay]
 * @returns {CancelableFunction}
 */
export function debounce(fn, delay = 300) {
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;

  /** @type {CancelableFunction} */
  const debounced = (...args) => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn(...args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };

  return debounced;
}

/**
 * Run immediately, then ignore calls until the quiet period has elapsed.
 *
 * @param {(...args: any[]) => void} fn
 * @param {number} [delay]
 * @returns {CancelableFunction}
 */
export function debounceLeading(fn, delay = 300) {
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;

  /** @type {CancelableFunction} */
  const debounced = (...args) => {
    if (timer === undefined) fn(...args);
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, delay);
  };

  debounced.cancel = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };

  return debounced;
}

/**
 * Run at most once per interval. The first call runs immediately.
 *
 * @param {(...args: any[]) => void} fn
 * @param {number} [interval]
 * @returns {(...args: any[]) => void}
 */
export function throttle(fn, interval = 300) {
  let lastRun = -Infinity;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun < interval) return;
    lastRun = now;
    fn(...args);
  };
}

/**
 * Collapse repeated calls into the next animation frame.
 * The browser APIs are resolved at call time, so importing this module is SSR-safe.
 *
 * @param {(...args: any[]) => void} fn
 * @returns {CancelableFunction}
 */
export function debounceFrame(fn) {
  /** @type {number | undefined} */
  let frame;

  /** @type {CancelableFunction} */
  const debounced = (...args) => {
    if (frame !== undefined) globalThis.cancelAnimationFrame(frame);
    frame = globalThis.requestAnimationFrame(() => {
      frame = undefined;
      fn(...args);
    });
  };

  debounced.cancel = () => {
    if (frame !== undefined) globalThis.cancelAnimationFrame(frame);
    frame = undefined;
  };

  return debounced;
}
