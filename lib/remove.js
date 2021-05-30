const fs = require('fs');
const noop = require('./noop');

module.exports = (target) => fs.unlink(target, noop)