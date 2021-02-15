require("@testing-library/jest-dom/extend-expect");
const { runWebpack, resourceLoader } = require("../test-helper");

const { render } = require("../..");

test("Render app which is downloading additional chunks", async () => {
  const fs = await runWebpack(require.resolve("./app.jsx"));
  const host = "http://localhost";

  const dom = await render({
    html: `
      <body>
        <div id="app"></div>
        <script src="/app.js"></script>
      </body>
    `,
    url: host,
    resourceLoader: resourceLoader(fs, host),
  });

  const {
    window: { document },
  } = dom;

  expect(document.querySelector("#app")).toHaveTextContent("Hello World");
});
