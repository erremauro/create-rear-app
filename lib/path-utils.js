const fs = require("fs");
const path = require("path");

module.exports = {
  isPath,
  exists,
};

///////////////////////////////////////////

/**
 * Test if a given string format is a path.
 * @param  {String}  text - Text to be tested.
 * @return {Boolean} - True is the text represents a path, otherwise false.
 */
function isPath(text) {
  const pattern = /(([B-Z]:\\[\w\s]+|~|%\w+%|\.{1,2}|\/\w+))((\\[\s\w]+)+)?/i;
  return !pattern.test(text) ? false : true;
}

function exists(target) {
  try {
    const stats = fs.lstatSync(path.resolve(target));
    return stats.isFile() || stats.isDirectory();
  } catch (err) {
    if (err && err.code === "ENOENT") return false;
    if (err && err.code !== "ENOENT") throw err;
  }
}
