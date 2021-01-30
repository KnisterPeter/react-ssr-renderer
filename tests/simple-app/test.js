const { JSDOM } = require("jsdom");

const { renderFile } = require("../..");

test("Render simple app (e.g. without data fetching)", async () => {
  const html = await renderFile(require.resolve("./app.js"));

  const dom = new JSDOM(html);
  expect(dom.window.document.querySelector("div").innerHTML).toBe(
    "Hello World"
  );
});
