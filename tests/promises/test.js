const fakePromiseFactory = require("../../lib/fake-promise");

test("FakePromise should wrap new Promise", async () => {
  const WrappedPromise = fakePromiseFactory(Promise);

  new WrappedPromise((resolve) => resolve());

  const active = WrappedPromise.activePromises;
  expect(active).toHaveLength(1);

  await Promise.all(active);
});

test("FakePromise should wrap next then-ed promise", async () => {
  const WrappedPromise = fakePromiseFactory(Promise);

  new WrappedPromise((resolve) => resolve()).then(() => {});

  const active = WrappedPromise.activePromises;
  expect(active).toHaveLength(2);

  await Promise.all(active);
});

test("FakePromise should wrap next catch-ed promise", async () => {
  const WrappedPromise = fakePromiseFactory(Promise);

  new WrappedPromise((resolve) => resolve())
    .then(() => {
      throw new Error();
    })
    .catch(() => {});

  const active = WrappedPromise.activePromises;
  expect(active).toHaveLength(3);

  expect(Promise.all(active)).rejects.toThrow();
});

test("FakePromise should wrap Promise.all", async () => {
  const WrappedPromise = fakePromiseFactory(Promise);

  WrappedPromise.all([
    new WrappedPromise((resolve) => {
      setTimeout(resolve, 100);
    }),
    new WrappedPromise((resolve) => resolve()),
  ])
    .then(() => {
      return new WrappedPromise((resolve) => {
        setTimeout(resolve, 100);
      });
    })
    .then(() => 123);

  const active = WrappedPromise.activePromises;
  expect(active).toHaveLength(5);

  await Promise.all(active);
});
