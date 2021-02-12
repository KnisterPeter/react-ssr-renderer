/**
 * @param {Object} options
 * @param {import('jsdom').JSDOM=} options.dom
 * @param {string} options.code
 * @param {string} options.filename
 */
export function render({ dom, code, filename }: {
    dom?: import('jsdom').JSDOM | undefined;
    code: string;
    filename: string;
}): Promise<string>;
/**
 * @param {Object} options
 * @param {import('jsdom').JSDOM=} options.dom
 * @param {string} options.filename
 */
export function renderFile({ dom, filename }: {
    dom?: import('jsdom').JSDOM | undefined;
    filename: string;
}): Promise<string>;
