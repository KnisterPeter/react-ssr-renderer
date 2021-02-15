const { JSDOM } = require("jsdom");
const { runWebpack, TestResourceLoader } = require("../test-helper");

const { Renderer } = require("../..");

test("Render app with react-query", async () => {
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

  const h1 = document.querySelector("h1");
  const strong = document.querySelectorAll("strong");

  expect(h1).toHaveTextContent("react-query");
  expect(strong).toHaveLength(3);
  expect(strong[2]).toHaveTextContent(/🍴 \d+/);
});
