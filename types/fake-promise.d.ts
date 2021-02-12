export = fakePromiseFactory;
/**
 * @param {typeof Promise} NativePromise
 */
declare function fakePromiseFactory(NativePromise: typeof Promise): {
    new (task: () => unknown): {};
    /** @type {Promise<unknown>[]} */
    activePromises: Promise<unknown>[];
    /**
     * @param {unknown} value
     */
    resolve(value: unknown): Promise<unknown>;
    /**
     * @param {unknown} value
     */
    reject(value: unknown): Promise<never>;
};
