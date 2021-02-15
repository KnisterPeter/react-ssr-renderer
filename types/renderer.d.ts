export class Renderer {
    Promise: {
        new (task: () => unknown): {};
        activePromises: Promise<unknown>[];
        retrieveAndClearActivePromises(): Promise<unknown>[];
        wrap(p: Promise<any>): {
            then(...args: any[]): any;
            catch(...args: any[]): any;
            finally(...args: any[]): any;
        };
        resolve(value: unknown): {
            then(...args: any[]): any;
            catch(...args: any[]): any;
            finally(...args: any[]): any;
        };
        reject(value: unknown): {
            then(...args: any[]): any;
            catch(...args: any[]): any;
            finally(...args: any[]): any;
        };
        all(promises: Promise<any>[]): {
            then(...args: any[]): any;
            catch(...args: any[]): any;
            finally(...args: any[]): any;
        };
    };
    /** @type {undefined | (() => void)} */
    notify: (() => void) | undefined;
    /** @type {Promise<void>} */
    domReady: Promise<void>;
    /**
     * Sets the key `k` on object `o` to value `v`.
     *
     * @private
     * @param {object} o
     * @param {string} k
     * @param {unknown} v
     */
    private _set;
    /**
     * @private
     * @param {Window} window
     * @param {Window['fetch']} externalFetch
     */
    private _setupFetch;
    /**
     * @private
     * @param {Window} window
     */
    private _setupPromiseTracker;
    /**
     * @param {Window} window
     * @param {Window['fetch']} externalFetch
     */
    setup(window: Window, externalFetch: Window['fetch']): void;
    _getActivePromisesAfterEventLoop(): Promise<Promise<unknown>[]>;
    render(): Promise<void>;
}
