export = fakePromiseFactory;
/**
 * @param {typeof Promise} NativePromise
 */
declare function fakePromiseFactory(NativePromise: typeof Promise): {
    new (task: () => unknown): {};
    /** @type {Promise<unknown>[]} */
    activePromises: Promise<unknown>[];
    retrieveAndClearActivePromises(): Promise<unknown>[];
    /**
     * @param {Promise<any>} p
     */
    wrap(p: Promise<any>): {
        /**
         * @param {any[]} args
         */
        then(...args: any[]): any;
        /**
         * @param {any[]} args
         */
        catch(...args: any[]): any;
        /**
         * @param {any[]} args
         */
        finally(...args: any[]): any;
    };
    /**
     * @param {unknown} value
     */
    resolve(value: unknown): {
        /**
         * @param {any[]} args
         */
        then(...args: any[]): any;
        /**
         * @param {any[]} args
         */
        catch(...args: any[]): any;
        /**
         * @param {any[]} args
         */
        finally(...args: any[]): any;
    };
    /**
     * @param {unknown} value
     */
    reject(value: unknown): {
        /**
         * @param {any[]} args
         */
        then(...args: any[]): any;
        /**
         * @param {any[]} args
         */
        catch(...args: any[]): any;
        /**
         * @param {any[]} args
         */
        finally(...args: any[]): any;
    };
    /**
     * @param {Promise<any>[]} promises
     */
    all(promises: Promise<any>[]): {
        /**
         * @param {any[]} args
         */
        then(...args: any[]): any;
        /**
         * @param {any[]} args
         */
        catch(...args: any[]): any;
        /**
         * @param {any[]} args
         */
        finally(...args: any[]): any;
    };
};
