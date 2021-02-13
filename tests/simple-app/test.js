const { render } = require("../test-helper");

test("Render simple app (e.g. without data fetching)", async () => {
  const {
    window: { document },
  } = await render({ file: require.resolve("./app.jsx") });

  expect(document.querySelector("div")).toHaveTextContent("Hello World");
});
