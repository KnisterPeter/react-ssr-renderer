/**
 * @param {string} code
 * @param {string} filename
 */
export function render(code: string, filename: string): Promise<string | undefined>;
/**
 * @param {string} filename
 */
export function renderFile(filename: string): Promise<string | undefined>;
