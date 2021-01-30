const { readFileSync } = require("fs");
const { BrowserModule } = require("./browser-module");

/**
 * @param {string} filename
 */
async function renderFile(filename) {
  return render(readFileSync(filename, "utf-8"), filename);
}

/**
 * @param {string} code
 * @param {string} filename
 */
async function render(code, filename) {
  return new BrowserModule(code, filename).render();
}

module.exports = {
  render,
  renderFile,
};
