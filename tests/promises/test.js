const { promiseTrackerFactory } = require("../../lib/promise-tracker");

test("PromiseTracker should wrap new Promise", async () => {
  const PromiseTracker = promiseTrackerFactory(Promise);

  new PromiseTracker((resolve) => resolve());

  const active = PromiseTracker.retrieveAndClearActivePromises();
  expect(active).toHaveLength(1);

  await Promise.all(active);
});

test("PromiseTracker should wrap next then-ed promise", async () => {
  const PromiseTracker = promiseTrackerFactory(Promise);

  new PromiseTracker((resolve) => resolve()).then(() => {});

  const active = PromiseTracker.retrieveAndClearActivePromises();
  expect(active).toHaveLength(2);

  await Promise.all(active);
});

test("PromiseTracker should wrap next catch-ed promise", async () => {
  const PromiseTracker = promiseTrackerFactory(Promise);

  new PromiseTracker((resolve) => resolve())
    .then(() => {
      throw new Error();
    })
    .catch(() => {});

  const active = PromiseTracker.retrieveAndClearActivePromises();
  expect(active).toHaveLength(3);

  expect(Promise.all(active)).rejects.toThrow();
});

test("PromiseTracker should wrap Promise.all", async () => {
  const PromiseTracker = promiseTrackerFactory(Promise);

  PromiseTracker.all([
    new PromiseTracker((resolve) => {
      setTimeout(resolve, 100);
    }),
    new PromiseTracker((resolve) => resolve()),
  ])
    .then(() => {
      return new PromiseTracker((resolve) => {
        setTimeout(resolve, 100);
      });
    })
    .then(() => 123);

  const active = PromiseTracker.retrieveAndClearActivePromises();
  expect(active).toHaveLength(5);

  await Promise.all(active);
});

test("PromiseTracker should wrap Promise.resolve", async () => {
  const PromiseTracker = promiseTrackerFactory(Promise);

  PromiseTracker.resolve();

  const active = PromiseTracker.retrieveAndClearActivePromises();
  expect(active).toHaveLength(1);

  await Promise.all(active);
});

test("PromiseTracker should wrap Promise.reject", async () => {
  const PromiseTracker = promiseTrackerFactory(Promise);

  PromiseTracker.reject(1);

  const active = PromiseTracker.retrieveAndClearActivePromises();
  expect(active).toHaveLength(1);

  expect(Promise.all(active)).rejects.toBe(1);
});

test("PromiseTracker should wrap Promise.finally", async () => {
  const PromiseTracker = promiseTrackerFactory(Promise);

  PromiseTracker.resolve().finally();

  const active = PromiseTracker.retrieveAndClearActivePromises();
  expect(active).toHaveLength(2);

  await Promise.all(active);
});
