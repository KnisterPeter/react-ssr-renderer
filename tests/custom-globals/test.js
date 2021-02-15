const { runWebpack, resourceLoader } = require("../test-helper");

const { render } = require("../..");

test("Render app with given external global data", async () => {
  const fs = await runWebpack(require.resolve("./app.jsx"));
  const host = "http://localhost";

  const dom = await render({
    html: `
      <body>
        <script src="/app.js"></script>
      </body>
    `,
    url: host,
    setupGlobals(window) {
      window.message = "Hello global world!";
    },
    resourceLoader: resourceLoader(fs, host),
  });

  const {
    window: { document },
  } = dom;

  expect(document.querySelector("div")).toHaveTextContent(
    "Hello global world!"
  );
});
