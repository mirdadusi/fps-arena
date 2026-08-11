/**
 * Owns reversible side effects for one component lifetime.
 *
 * Event listeners, timers, subscriptions and other cleanup callbacks are
 * registered in one place and unwound in reverse construction order. dispose()
 * is deliberately idempotent so partially-constructed objects are safe to
 * tear down as well.
 */
export class Lifetime {
  #cleanups = [];
  #disposed = false;

  get disposed() { return this.#disposed; }
  get size() { return this.#cleanups.length; }

  add(cleanup) {
    if (typeof cleanup !== 'function') return cleanup;
    if (this.#disposed) {
      cleanup();
      return cleanup;
    }
    this.#cleanups.push(cleanup);
    return cleanup;
  }

  listen(target, type, handler, options) {
    target?.addEventListener(type, handler, options);
    this.add(() => target?.removeEventListener(type, handler, options));
    return handler;
  }

  timeout(callback, delay) {
    if (this.#disposed) return 0;
    const id = setTimeout(() => {
      const index = this.#cleanups.indexOf(cancel);
      if (index >= 0) this.#cleanups.splice(index, 1);
      if (!this.#disposed) callback();
    }, delay);
    const cancel = () => clearTimeout(id);
    this.add(cancel);
    return id;
  }

  dispose() {
    if (this.#disposed) return;
    this.#disposed = true;
    const cleanups = this.#cleanups.splice(0).reverse();
    for (const cleanup of cleanups) {
      try { cleanup(); } catch (error) {
        console.warn('[Lifetime] Cleanup failed:', error);
      }
    }
  }
}
