const { JSDOM } = require("jsdom");
const { runWebpack, TestResourceLoader } = require("../test-helper");

const { Renderer } = require("../..");

test("Render app with given external global data", async () => {
  const fs = await runWebpack(require.resolve("./app.jsx"));
  const host = "http://localhost";

  const renderer = new Renderer();

  const dom = new JSDOM(
    `
    <body>
      <script src="/app.js"></script>
    </body>
    `,
    {
      url: host,
      beforeParse(window) {
        window.message = "Hello global world!";

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

  expect(document.querySelector("div")).toHaveTextContent(
    "Hello global world!"
  );
});
