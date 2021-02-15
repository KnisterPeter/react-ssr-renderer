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
     * @param {import('jsdom').JSDOM['window']} window
     * @param {import('jsdom').JSDOM['window']['fetch']=} externalFetch
     */
    private _setupFetch;
    /**
     * @private
     * @param {import('jsdom').JSDOM['window']} window
     */
    private _setupPromiseTracker;
    /**
     * @param {import('jsdom').JSDOM['window']} window
     * @param {import('jsdom').JSDOM['window']['fetch']=} externalFetch
     */
    setup(window: import('jsdom').JSDOM['window'], externalFetch?: import('jsdom').JSDOM['window']['fetch'] | undefined): void;
    _getActivePromisesAfterEventLoop(): Promise<Promise<unknown>[]>;
    render(): Promise<void>;
}
