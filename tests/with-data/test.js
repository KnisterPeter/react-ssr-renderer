const { render } = require("../test-helper");

test("Render app with react-query", async () => {
  const {
    window: { document },
  } = await render({
    file: require.resolve("./app.jsx"),
  });

  const h1 = document.querySelector("h1");
  const strong = document.querySelectorAll("strong");

  expect(h1).toHaveTextContent("react-query");
  expect(strong).toHaveLength(3);
  expect(strong[2]).toHaveTextContent(/🍴 \d+/);
});
