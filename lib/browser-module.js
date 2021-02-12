const { ContextModule } = require("./context-module");

/**
 * @typedef {import('jsdom').JSDOM} JSDOM
 */

class BrowserModule extends ContextModule {
  /**
   * @param {Object} options
   * @param {import('jsdom').JSDOM=} options.dom
   * @param {Record<string, unknown>=} options.globals
   * @param {string} options.code
   * @param {string} options.filename
   */
  constructor({ dom, globals, code, filename }) {
    super(code, filename, undefined);

    this.Promise = /** @type {any} */ (this._internalRequire(
      "./fake-promise",
      __dirname
    ))(Promise);

    this.fetch = this._require("node-fetch");

    if (dom) {
      this.dom = dom;
    } else {
      const { JSDOM } = this._require("jsdom");
      /** @type {JSDOM} */
      this.dom = new JSDOM(`<!DOCTYPE html>
  <html>
  <head><head>
  <body></body>
  </html>`);
    }

    this.globals = globals || {};
  }

  /**
   * @returns {Record<string, unknown>}
   */
  _getGlobals() {
    return {
      ...this.globals,
      process: {
        env: {},
        nextTick: process.nextTick,
      },
      console,
      Buffer,
      Error,
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
      fetch: this.fetch,
      Promise: this.Promise,
      window: this.dom ? this.dom.window : undefined,
      document: this.dom ? this.dom.window.document : undefined,
      navigator: this.dom ? this.dom.window.navigator : undefined,
    };
  }

  async render() {
    this.evaluate();

    // continue after the scheduled event loop entries are done
    await new Promise((resolve) => setTimeout(resolve, 0));

    await Promise.all(this.Promise.activePromises);

    return this.dom.serialize();
  }
}

module.exports = {
  BrowserModule,
};
