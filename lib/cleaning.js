const fs = require("fs");
const path = require("path");

module.exports = cleaning;

///////////////////////////////////////////

function cleaning(destPath, appName) {
  return new Promise((resolve, reject) => {
    const packageJsonFile = path.join(destPath, "package.json");
    fs.readFile(packageJsonFile, "utf-8", (err, data) => {
      let packageJson = JSON.parse(data);

      packageJson.name = appName.toLowerCase().replace(/\s/i, "-");

      delete packageJson["files"];
      delete packageJson["main"];
      delete packageJson["scripts"]["clean-files"];
      delete packageJson["scripts"]["copy-files"];
      delete packageJson["scripts"]["prepublishOnly"];
      packageJson.author = "";
      packageJson.description = "";

      const jsonData = JSON.stringify(packageJson, null, 4);
      fs.writeFile(packageJsonFile, jsonData, (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  });
}
