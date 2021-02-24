const { runWebpack, resourceLoader } = require("../test-helper");

const { render } = require("../..");

test("Render app with react-query", async () => {
  const fs = await runWebpack(require.resolve("./app.jsx"));
  const host = "http://localhost";

  const dom = await render({
    html: `
      <body>
        <script src="/app.js"></script>
      </body>
    `,
    url: host,
    resourceLoader: resourceLoader(fs, host),
    async fetch() {
      throw new Error("fetch not allowed");
    },
  });

  const {
    window: { document },
  } = dom;

  const p = document.querySelector("p");

  expect(p).toHaveTextContent("2");
});
