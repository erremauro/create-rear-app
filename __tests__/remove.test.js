const fs = require('fs');
const remove = require('../lib/remove');

jest.mock('fs', () => ({ unlink: jest.fn() }));

it('call unlink to remove directory or file', () => {
  const dir = "./directory-to-remove";
  remove(dir)
  expect(fs.unlink.mock.calls[0][0]).toBe(dir)
})

