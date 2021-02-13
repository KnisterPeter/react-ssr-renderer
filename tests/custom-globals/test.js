const { render } = require("../test-helper");

test("Render app with given external global data", async () => {
  const {
    window: { document },
  } = await render({
    file: require.resolve("./app.jsx"),
    globals: {
      message: "Hello global world!",
    },
  });

  expect(document.querySelector("div")).toHaveTextContent(
    "Hello global world!"
  );
});
