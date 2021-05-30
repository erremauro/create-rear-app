const path = require('path');
const os = require('os');
const fs = require('fs');
const https = require('https');
const remove = require('./remove');
const constants = require('./constants');

module.exports = download;

///////////////////////////////////////////

function download(fileURL = constants.templateURL) {
  return new Promise((resolve, reject) => {
    const dest = path.join(os.tmpdir(), constants.archiveName + ".zip");
    remove(dest);

    const file = fs.createWriteStream(dest, { flags: "wx" });
    const request = https.get(fileURL, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
      } else {
        file.close();
        remove(dest)
        return reject(`Server responded with ${response.statusCode}`);
      }
    });

    file.on("finish", () => {
      file.close();
      resolve(dest);
    });

    file.on("error", (err) => {
      file.close();
      if (err.code === "EEXIST") {
        reject("File already exists");
      } else {
        remove(dest); // Delete temp file
        reject(err.message);
      }
    });

    request.on("error", function (err) {
      file.close();
      remove(dest);
      reject(err.message);
    });
  });
}