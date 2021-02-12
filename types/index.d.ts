/**
 * @param {Object} options
 * @param {import('jsdom').JSDOM=} options.dom
 * @param {Record<string, unknown>=} options.globals
 * @param {string} options.code
 * @param {string} options.filename
 */
export function render({ dom, globals, code, filename }: {
    dom?: import('jsdom').JSDOM | undefined;
    globals?: Record<string, unknown> | undefined;
    code: string;
    filename: string;
}): Promise<string>;
/**
 * @param {Object} options
 * @param {import('jsdom').JSDOM=} options.dom
 * @param {Record<string, unknown>=} options.globals
 * @param {string} options.filename
 */
export function renderFile({ dom, globals, filename }: {
    dom?: import('jsdom').JSDOM | undefined;
    globals?: Record<string, unknown> | undefined;
    filename: string;
}): Promise<string>;
