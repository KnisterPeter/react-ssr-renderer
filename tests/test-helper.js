require("@testing-library/jest-dom/extend-expect");

const { transformFileAsync } = require("@babel/core");
const { JSDOM } = require("jsdom");

const { render: serverRender } = require("..");

/**
 * @param {object} options
 * @param {string} options.file
 * @param {JSDOM=} options.dom
 * @param {Record<string, unknown>=} options.globals
 * @returns {Promise<JSDOM>}
 */
async function render({ file, dom, globals }) {
  const compiled = await transformFileAsync(file, {
    presets: ["@babel/preset-react"],
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  });

  const html = await serverRender({
    code: compiled.code,
    filename: `${file}.babel.js`,
    dom,
    globals,
  });

  return new JSDOM(html);
}

module.exports = {
  render,
};
