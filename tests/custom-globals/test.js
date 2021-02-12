const { JSDOM } = require("jsdom");

const { renderFile } = require("../..");

test("Render app with given external global data", async () => {
  const html = await renderFile({
    globals: {
      message: "Hello global world!",
    },
    filename: require.resolve("./app.js"),
  });

  const dom = new JSDOM(html);
  expect(dom.window.document.querySelector("div").innerHTML).toBe(
    "Hello global world!"
  );
});
