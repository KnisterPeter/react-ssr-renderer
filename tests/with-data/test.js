const { JSDOM } = require("jsdom");

const { renderFile } = require("../..");

test("Render app with react-query", async () => {
  const html = await renderFile(require.resolve("./app.js"));

  const dom = new JSDOM(html);
  expect(dom.window.document.querySelector("h1").innerHTML).toBe("react-query");
});
