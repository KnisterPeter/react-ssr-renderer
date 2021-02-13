const { JSDOM } = require("jsdom");
const { render } = require("../test-helper");

test("Render app in a custom prepared DOM", async () => {
  const {
    window: { document },
  } = await render({
    file: require.resolve("./app.jsx"),
    dom: new JSDOM('<body><div id="app"></div></body>'),
  });

  expect(document.querySelector("#app")).toHaveTextContent("Hello World");
});
