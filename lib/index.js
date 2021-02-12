const { readFileSync } = require("fs");
const { BrowserModule } = require("./browser-module");

/**
 * @param {Object} options
 * @param {import('jsdom').JSDOM=} options.dom
 * @param {Record<string, unknown>=} options.globals
 * @param {string} options.filename
 */
async function renderFile({ dom, globals, filename }) {
  return render({
    dom,
    globals,
    code: readFileSync(filename, "utf-8"),
    filename,
  });
}

/**
 * @param {Object} options
 * @param {import('jsdom').JSDOM=} options.dom
 * @param {Record<string, unknown>=} options.globals
 * @param {string} options.code
 * @param {string} options.filename
 */
async function render({ dom, globals, code, filename }) {
  return new BrowserModule({ dom, globals, code, filename }).render();
}

module.exports = {
  render,
  renderFile,
};
