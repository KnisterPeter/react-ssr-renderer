/**
 * @param {typeof Promise} NativePromise
 */
function promiseTrackerFactory(NativePromise) {
  return class PromiseTracker {
    /** @type {Promise<unknown>[]} */
    static activePromises = [];

    static retrieveAndClearActivePromises() {
      const promises = this.activePromises;
      this.activePromises = [];
      return promises;
    }

    /**
     * @param {Promise<any>} p
     */
    static wrap(p) {
      return {
        /**
         * @param {any[]} args
         */
        then(...args) {
          const next = p.then(...args);
          /** @type {any} */ (next).err = new Error();
          PromiseTracker.activePromises.push(next);
          return PromiseTracker.wrap(next);
        },
        /**
         * @param {any[]} args
         */
        catch(...args) {
          const next = p.catch(...args);
          /** @type {any} */ (next).err = new Error();
          PromiseTracker.activePromises.push(next);
          return PromiseTracker.wrap(next);
        },
        /**
         * @param {any[]} args
         */
        finally(...args) {
          const next = p.finally(...args);
          /** @type {any} */ (next).err = new Error();
          PromiseTracker.activePromises.push(next);
          return PromiseTracker.wrap(next);
        },
      };
    }

    /**
     * @param {() => unknown} task
     */
    constructor(task) {
      const promise = new NativePromise(task);
      /** @type {any} */ (promise).err = new Error();
      PromiseTracker.activePromises.push(promise);

      return PromiseTracker.wrap(promise);
    }

    /**
     * @param {unknown} value
     */
    static resolve(value) {
      const promise = NativePromise.resolve(value);
      /** @type {any} */ (promise).err = new Error();
      PromiseTracker.activePromises.push(promise);
      return PromiseTracker.wrap(promise);
    }

    /**
     * @param {unknown} value
     */
    static reject(value) {
      const promise = NativePromise.reject(value);
      /** @type {any} */ (promise).err = new Error();
      PromiseTracker.activePromises.push(promise);
      return PromiseTracker.wrap(promise);
    }

    /**
     * @param {Promise<any>[]} promises
     */
    static all(promises) {
      const promise = NativePromise.all(promises);
      /** @type {any} */ (promise).err = new Error();
      PromiseTracker.activePromises.push(promise);
      return PromiseTracker.wrap(promise);
    }
  };
}

module.exports = { promiseTrackerFactory };
