const { JSDOM } = require("jsdom");

const { renderFile } = require("../..");

test("Render app in a custom prepared DOM", async () => {
  const html = await renderFile({
    dom: new JSDOM('<body><div id="app"></div></body>'),
    filename: require.resolve("./app.js"),
  });

  const dom = new JSDOM(html);
  expect(dom.window.document.querySelector("#app").innerHTML).toBe(
    "Hello World"
  );
});
