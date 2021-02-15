const { runWebpack, resourceLoader } = require("../test-helper");

const { render } = require("../..");

test("Render simple app (e.g. without data fetching)", async () => {
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
  });

  const {
    window: { document },
  } = dom;

  expect(document.querySelector("div")).toHaveTextContent("Hello World");
});
