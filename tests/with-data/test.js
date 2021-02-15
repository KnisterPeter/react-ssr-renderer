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
  });

  const {
    window: { document },
  } = dom;

  const h1 = document.querySelector("h1");
  const strong = document.querySelectorAll("strong");

  expect(h1).toHaveTextContent("react-query");
  expect(strong).toHaveLength(3);
  expect(strong[2]).toHaveTextContent(/🍴 \d+/);
});
