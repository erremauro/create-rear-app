const fs = require("fs");
const path = require("path");
const os = require("os");
const AdmZip = require("adm-zip");
const remove = require("./remove");
const constants = require("./constants");

module.exports = unzip;

/**
 * Unzip a cra-template-rear archive to a given destination path.
 * @param  {String} filePath - ZIP archive path
 * @param  {String} destPath - Target unzip directory
 * @return {void}
 */
function unzip(filePath, destPath) {
  const zipFile = new AdmZip(filePath);
  const unzippedPath = path.join(os.tmpdir(), constants.unzipDirName);
  const srcPath = path.join(unzippedPath, constants.archiveName);

  zipFile.extractAllTo(unzippedPath, true);

  fs.renameSync(srcPath, destPath);
  remove(unzippedPath);
  remove(filePath);
}
