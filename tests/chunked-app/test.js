require("@testing-library/jest-dom/extend-expect");
const { JSDOM } = require("jsdom");
const { runWebpack, TestResourceLoader } = require("../test-helper");

const { Renderer } = require("../..");

test("Render app which is downloading additional chunks", async () => {
  const fs = await runWebpack(require.resolve("./app.jsx"));
  const host = "http://localhost";

  const renderer = new Renderer();

  const dom = new JSDOM(
    `<body>
      <div id="app"></div>
      <script src="/app.js"></script>
    </body>`,
    {
      url: host,
      beforeParse(window) {
        renderer.setup(window);
      },
      runScripts: "dangerously",
      resources: new TestResourceLoader(host, fs),
    }
  );

  await renderer.render();

  const {
    window: { document },
  } = dom;

  expect(document.querySelector("#app")).toHaveTextContent("Hello World");
});
