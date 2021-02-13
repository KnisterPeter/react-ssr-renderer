/**
 * @param {typeof Promise} NativePromise
 */
function fakePromiseFactory(NativePromise) {
  return class FakePromise {
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
          FakePromise.activePromises.push(next);
          return FakePromise.wrap(next);
        },
        /**
         * @param {any[]} args
         */
        catch(...args) {
          const next = p.catch(...args);
          FakePromise.activePromises.push(next);
          return FakePromise.wrap(next);
        },
        /**
         * @param {any[]} args
         */
        finally(...args) {
          const next = p.finally(...args);
          FakePromise.activePromises.push(next);
          return FakePromise.wrap(next);
        },
      };
    }

    /**
     * @param {() => unknown} task
     */
    constructor(task) {
      const promise = new NativePromise(task);
      FakePromise.activePromises.push(promise);

      return FakePromise.wrap(promise);
    }

    /**
     * @param {unknown} value
     */
    static resolve(value) {
      const promise = NativePromise.resolve(value);
      FakePromise.activePromises.push(promise);
      return FakePromise.wrap(promise);
    }

    /**
     * @param {unknown} value
     */
    static reject(value) {
      const promise = NativePromise.reject(value);
      FakePromise.activePromises.push(promise);
      return FakePromise.wrap(promise);
    }

    /**
     * @param {Promise<any>[]} promises
     */
    static all(promises) {
      const promise = NativePromise.all(promises);
      FakePromise.activePromises.push(promise);
      return FakePromise.wrap(promise);
    }
  };
}

module.exports = fakePromiseFactory;
