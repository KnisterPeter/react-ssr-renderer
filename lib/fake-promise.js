/**
 * @param {typeof Promise} NativePromise
 */
function fakePromiseFactory(NativePromise) {
  return class FakePromise {
    /** @type {Promise<unknown>[]} */
    static activePromises = [];

    /**
     * @param {() => unknown} task
     */
    constructor(task) {
      const promise = new NativePromise(task);
      FakePromise.activePromises.push(promise);
      return promise;
    }

    /**
     * @param {unknown} value
     */
    static resolve(value) {
      const promise = NativePromise.resolve(value);
      FakePromise.activePromises.push(promise);
      return promise;
    }

    /**
     * @param {unknown} value
     */
    static reject(value) {
      const promise = NativePromise.reject(value);
      FakePromise.activePromises.push(promise);
      return promise;
    }
  };
}

module.exports = fakePromiseFactory;
