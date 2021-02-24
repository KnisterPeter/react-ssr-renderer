const { JSDOM, ResourceLoader } = require("jsdom");

const { Renderer } = require("./renderer");

/**
 * @typedef {import('jsdom').ResourceLoader} DOMResourceLoader
 * @typedef {import('jsdom').JSDOM['window']} DOMWinnow
 * @typedef {import('jsdom').FetchOptions} FetchOptions
 * @typedef {import('vm').Context} VMContext
 *
 * @typedef {(window: DOMWinnow) => void} SetupGlobalsFunction
 * @typedef {(url: string, options: FetchOptions) => Promise<string> | null} ResourceLoaderFunction
 */

/**
 * @param {object} options
 * @param {string} options.html
 * @param {string} options.url
 * @param {SetupGlobalsFunction=} options.setupGlobals
 * @param {ResourceLoaderFunction=} options.resourceLoader
 * @param {(typeof window['fetch'])=} options.fetch
 */
async function render({ html, url, setupGlobals, resourceLoader, fetch }) {
  const renderer = new Renderer();

  const dom = new JSDOM(html, {
    url,
    beforeParse(window) {
      if (setupGlobals) {
        setupGlobals(window);
      }

      renderer.setup(window, fetch);
    },
    runScripts: "dangerously",
    pretendToBeVisual: true,
    resources: new (class extends ResourceLoader {
      /**
       * @param {Parameters<DOMResourceLoader['fetch']>[0]} url
       * @param {Parameters<DOMResourceLoader['fetch']>[1]} options
       */
      fetch(url, options) {
        if (resourceLoader) {
          const resource = resourceLoader(url, options);
          if (resource) {
            return resource.then((content) => Buffer.from(content));
          }
          return null;
        }

        return super.fetch(url, options);
      }
    })(),
  });

  await renderer.render();

  return dom;
}

module.exports = {
  Renderer,
  render,
};
