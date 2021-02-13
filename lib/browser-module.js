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

    this.Promise = /** @type {import('./fake-promise')} */ (this._internalRequire(
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
      self: this.dom ? this.dom.window : undefined,
      document: this.dom ? this.dom.window.document : undefined,
      navigator: this.dom ? this.dom.window.navigator : undefined,
    };
  }

  async _getActivePromisesAfterEventLoop() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    return this.Promise.retrieveAndClearActivePromises();
  }

  async render() {
    this.evaluate();

    let activePromises = await this._getActivePromisesAfterEventLoop();
    while (activePromises.length > 0) {
      await Promise.all(activePromises);
      activePromises = await this._getActivePromisesAfterEventLoop();
    }

    return this.dom.serialize();
  }
}

module.exports = {
  BrowserModule,
};
