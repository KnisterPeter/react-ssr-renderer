/// <reference types="jsdom/ts3.4" />
export type DOMResourceLoader = import('jsdom').ResourceLoader;
export type DOMWinnow = import('jsdom').JSDOM['window'];
export type FetchOptions = import('jsdom').FetchOptions;
export type VMContext = import('vm').Context;
export type SetupGlobalsFunction = (window: DOMWinnow) => void;
export type ResourceLoaderFunction = (url: string, options: FetchOptions) => Promise<string> | null;
import { Renderer } from "./renderer";
/**
 * @typedef {import('jsdom').ResourceLoader} DOMResourceLoader
 * @typedef {import('jsdom').JSDOM['window']} DOMWinnow
 * @typedef {import('jsdom').FetchOptions} FetchOptions
 * @typedef {import('vm').Context} VMContext
 *
 * @typedef {(window: DOMWinnow) => void} SetupGlobalsFunction
 * @typedef {(url: string, options: FetchOptions) => Promise<string> | null} ResourceLoaderFunction
 */
/**
 * @param {object} options
 * @param {string} options.html
 * @param {string} options.url
 * @param {SetupGlobalsFunction=} options.setupGlobals
 * @param {ResourceLoaderFunction=} options.resourceLoader
 * @param {(typeof window['fetch'])=} options.fetch
 */
export function render({ html, url, setupGlobals, resourceLoader, fetch }: {
    html: string;
    url: string;
    setupGlobals?: SetupGlobalsFunction | undefined;
    resourceLoader?: ResourceLoaderFunction | undefined;
    fetch?: (typeof window['fetch']) | undefined;
}): Promise<JSDOM>;
import { JSDOM } from "jsdom";
export { Renderer };
