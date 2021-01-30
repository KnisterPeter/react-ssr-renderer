const { ContextModule } = require("./context-module");

/**
 * @typedef {import('jsdom').JSDOM} JSDOM
 */

class BrowserModule extends ContextModule {
  _globals = {};

  /**
   * @param {string} code
   * @param {string} filename
   */
  constructor(code, filename) {
    super(code, filename, undefined);
    this.Promise = /** @type {any} */ (this._internalRequire(
      "./fake-promise",
      __dirname
    ))(Promise);
    const { JSDOM } = this._require("jsdom");

    /** @type {JSDOM} */
    this.dom = new JSDOM(`<!DOCTYPE html>
<html>
<head><head>
<body></body>
</html>`);
  }

  /**
   * @returns {Record<string, unknown>}
   */
  _getGlobals() {
    return {
      ...this._globals,
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
      /**
       * @param {unknown[]} args
       */
      fetch: this._fetch.bind(this),
      Promise: this.Promise,
      window: this.dom?.window,
      document: this.dom?.window.document,
      navigator: this.dom?.window.navigator,
    };
  }

  /**
   * @private
   * @param  {...unknown} args
   */
  async _fetch(...args) {
    return this._require("node-fetch")(...args);
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
