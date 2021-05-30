const pathUtils = require('../lib/path-utils');

it("can detect path strings", () => {
  expect(pathUtils.isPath("not a path")).toBe(false);
  expect(pathUtils.isPath("~/Downloads/")).toBe(true);
  expect(pathUtils.isPath("C:DocumentsMy file.txt")).toBe(true);
});

it("can check if path exists", () => {
  expect(pathUtils.exists("~/wrong path")).toBe(false);
  expect(pathUtils.exists(__dirname + "/../__tests__")).toBe(true);
});
