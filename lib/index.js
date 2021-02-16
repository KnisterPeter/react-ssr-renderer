const { JSDOM, ResourceLoader } = require("jsdom");

const { Renderer } = require("./renderer");

/**
 * @param {object} options
 * @param {string} options.html
 * @param {string} options.url
 * @param {((window: import('jsdom').JSDOM['window']) => void)=} options.setupGlobals
 * @param {((url: string, options: import('jsdom').FetchOptions) => Promise<string> | null)=} options.resourceLoader
 */
async function render({ html, url, setupGlobals, resourceLoader }) {
  const renderer = new Renderer();

  const dom = new JSDOM(html, {
    url,
    beforeParse(window) {
      if (setupGlobals) {
        setupGlobals(window);
      }

      renderer.setup(window);
    },
    runScripts: "dangerously",
    pretendToBeVisual: true,
    resources: new (class extends ResourceLoader {
      /**
       * @param {Parameters<import('jsdom').ResourceLoader['fetch']>[0]} url
       * @param {Parameters<import('jsdom').ResourceLoader['fetch']>[1]} options
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
