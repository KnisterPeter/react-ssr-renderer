/// <reference types="jsdom/ts3.4" />
import { Renderer } from "./renderer";
/**
 * @param {object} options
 * @param {string} options.html
 * @param {string} options.url
 * @param {((window: import('jsdom').JSDOM['window']) => void)=} options.setupGlobals
 * @param {((url: string, options: import('jsdom').FetchOptions) => Promise<string> | null)=} options.resourceLoader
 * @param {(typeof window['fetch'])=} options.fetch
 */
export function render({ html, url, setupGlobals, resourceLoader, fetch }: {
    html: string;
    url: string;
    setupGlobals?: ((window: import('jsdom').JSDOM['window']) => void) | undefined;
    resourceLoader?: ((url: string, options: import('jsdom').FetchOptions) => Promise<string> | null) | undefined;
    fetch?: (typeof window['fetch']) | undefined;
}): Promise<JSDOM>;
import { JSDOM } from "jsdom";
export { Renderer };
