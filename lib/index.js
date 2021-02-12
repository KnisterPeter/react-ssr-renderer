const { readFileSync } = require("fs");
const { BrowserModule } = require("./browser-module");

/**
 * @param {Object} options
 * @param {import('jsdom').JSDOM=} options.dom
 * @param {string} options.filename
 */
async function renderFile({ dom, filename }) {
  return render({
    dom,
    code: readFileSync(filename, "utf-8"),
    filename,
  });
}

/**
 * @param {Object} options
 * @param {import('jsdom').JSDOM=} options.dom
 * @param {string} options.code
 * @param {string} options.filename
 */
async function render({ dom, code, filename }) {
  return new BrowserModule({ dom, code, filename }).render();
}

module.exports = {
  render,
  renderFile,
};
