const { BrowserModule } = require("./browser-module");

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
};
