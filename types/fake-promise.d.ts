export = fakePromiseFactory;
/**
 * @param {typeof Promise} NativePromise
 */
declare function fakePromiseFactory(NativePromise: typeof Promise): {
    new (task: () => unknown): {};
    /** @type {Promise<unknown>[]} */
    activePromises: Promise<unknown>[];
    resolve: {
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    };
};
