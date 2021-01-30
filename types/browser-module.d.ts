/// <reference types="jsdom/ts3.5" />
/// <reference types="jsdom" />
/// <reference types="jsdom/ts3.4" />
export type JSDOM = import("jsdom").JSDOM;
/**
 * @typedef {import('jsdom').JSDOM} JSDOM
 */
export class BrowserModule extends ContextModule {
    /**
     * @param {string} code
     * @param {string} filename
     */
    constructor(code: string, filename: string);
    _globals: {
        process: {
            env: {};
            nextTick: (callback: Function, ...args: any[]) => void;
        };
        console: Console;
        Buffer: typeof Buffer;
        Error: ErrorConstructor;
        setTimeout: typeof setTimeout;
        clearTimeout: typeof clearTimeout;
        setInterval: typeof setInterval;
        clearInterval: typeof clearInterval;
        fetch(): never;
        Promise: any;
    };
    /**
     * @private
     */
    private _createGlobalDOM;
    /** @type {JSDOM} */
    dom: import("jsdom").JSDOM | undefined;
    render(): Promise<string | undefined>;
}
import { ContextModule } from "./context-module";
