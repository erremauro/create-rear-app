const path = require("path");
const { spawnSync } = require("child_process");
const logger = require("rear-logger")("create-app");
const pathUtils = require("./path-utils");
const constants = require("./constants");
const download = require("./download");
const unzip = require("./unzip");
const cleaning = require("./cleaning");

module.exports = createApp;

///////////////////////////////////////////

function createApp(appName, pkg) {
  logger.highlight(`${pkg.name} v${pkg.version}\n`);

  const isAppName = !pathUtils.isPath(appName);
  const destinationPath = isAppName
    ? path.join(process.cwd(), appName)
    : appName;
  const basename = isAppName ? appName : path.basename(destinationPath);

  if (pathUtils.exists(destinationPath)) {
    logger.error(`%c${destinationPath}%c already exists`, "green");
    return;
  }

  logger.log(`Creating a new Rear app in %c${destinationPath}\n`, "green");
  logger.log(`Installing the package. This could take a couple of minutes.`);
  logger.log(`Installing %ccra-template-rear%c...\n`, "cyan", "reset");

  download(constants.templateURL)
    .then((tmpPath) => {
      unzip(tmpPath, destinationPath);
      spawnSync("yarn", ["--cwd", destinationPath], { stdio: "inherit" });
      return cleaning(destinationPath, appName);
    })
    .then(() => {
      logger.log(
        `\nSuccess! Created %c${basename}%c at %c${destinationPath}`,
        "cyan",
        "reset",
        "green"
      );
      logger.log("Inside that directory, you can run several commands:");
      logger.log("\n  %cyarn create-component", "cyan");
      logger.log("    Creates a new React Component.");
      logger.log("\n  %cyarn create-container", "cyan");
      logger.log("    Creates a new React Container.");
      logger.log("\n  %cyarn create-action", "cyan");
      logger.log("    Creates a new Redux Action.");
      logger.log("\n  %cyarn start", "cyan");
      logger.log("    Starts the development server.");
      logger.log("\n  %cyarn build", "cyan");
      logger.log("    Bundles the app into static files for production");
      logger.log("\nWe suggest that you begin by typing:");
      logger.log(`\n%ccd%c ${isAppName ? appName : destinationPath}`, "cyan");
      logger.log("%cyarn start", "cyan");
      logger.log("\nHappy hacking!");
    })
    .catch((err) => {
      logger.error(err);
    });
}
