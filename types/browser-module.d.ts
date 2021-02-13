/// <reference types="jsdom/ts3.5" />
/// <reference types="jsdom" />
/// <reference types="jsdom/ts3.4" />
export type JSDOM = import("jsdom").JSDOM;
/**
 * @typedef {import('jsdom').JSDOM} JSDOM
 */
export class BrowserModule extends ContextModule {
    /**
     * @param {Object} options
     * @param {import('jsdom').JSDOM=} options.dom
     * @param {Record<string, unknown>=} options.globals
     * @param {string} options.code
     * @param {string} options.filename
     */
    constructor({ dom, globals, code, filename }: {
        dom?: import('jsdom').JSDOM | undefined;
        globals?: Record<string, unknown> | undefined;
        code: string;
        filename: string;
    });
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
    fetch: any;
    dom: import("jsdom").JSDOM;
    globals: Record<string, unknown>;
    _getActivePromisesAfterEventLoop(): Promise<Promise<unknown>[]>;
    render(): Promise<string>;
}
import { ContextModule } from "./context-module";
