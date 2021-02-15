const { promiseTrackerFactory } = require("./promise-tracker");

class Renderer {
  constructor() {
    this.Promise = promiseTrackerFactory(Promise);

    /** @type {undefined | (() => void)} */
    this.notify = undefined;
    var self = this;
    /** @type {Promise<void>} */
    this.domReady = new Promise((resolve) => {
      self.notify = resolve;
    });
  }

  /**
   * Sets the key `k` on object `o` to value `v`.
   *
   * @private
   * @param {object} o
   * @param {string} k
   * @param {unknown} v
   */
  _set(o, k, v) {
    /** @type {Record<string, unknown>} */ (o)[k] = v;
  }

  /**
   * @private
   * @param {Window} window
   * @param {Window['fetch']} externalFetch
   */
  _setupFetch(window, externalFetch) {
    const {
      Headers,
      Request,
      Response,
      fetch: fetchPolyfill,
    } = require("cross-fetch");
    const fetch = externalFetch || fetchPolyfill;

    this._set(window, "Headers", Headers);
    this._set(window, "Request", Request);
    this._set(window, "Response", Response);
    this._set(
      window,
      "fetch",
      /**
       * @param {Parameters<fetch>[0]} url
       * @param {Parameters<fetch>[1]} options
       */
      (url, options) => {
        if (
          typeof url !== "string" &&
          !options &&
          !/^https?:\/\//.test(url.url)
        ) {
          return fetch(new URL(url.url, window.location.href).toString(), url);
        }
        return fetch(url, options);
      }
    );
  }

  /**
   * @private
   * @param {Window} window
   */
  _setupPromiseTracker(window) {
    this._set(window, "Promise", this.Promise);
    // on node, cross-fetch is using node-fetch and that
    // should use our PromiseTracker
    /** @type {any} */ (window.fetch).Promise = this.Promise;
  }

  /**
   * @param {Window} window
   * @param {Window['fetch']} externalFetch
   */
  setup(window, externalFetch) {
    this._setupFetch(window, externalFetch);
    this._setupPromiseTracker(window);

    // this._set(window, "matchMedia", () => {
    //   return {
    //     matches: false,
    //     media: "",
    //     addListener: () => undefined,
    //   };
    // });

    window.document.addEventListener("DOMContentLoaded", () => {
      this.notify && this.notify();
    });
  }

  async _getActivePromisesAfterEventLoop() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    return this.Promise.retrieveAndClearActivePromises();
  }

  async render() {
    await this.domReady;

    let activePromises = await this._getActivePromisesAfterEventLoop();
    while (activePromises.length > 0) {
      await Promise.all(activePromises);
      activePromises = await this._getActivePromisesAfterEventLoop();
    }
  }
}

module.exports = {
  Renderer,
};
