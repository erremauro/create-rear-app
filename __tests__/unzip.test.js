const os = require("os");
const path = require("path");

const fs = require("fs");
const AdmZip = require("adm-zip");
const remove = require("../lib/remove");
const constants = require("../lib/constants");

const unzip = require("../lib/unzip");

jest.mock("fs", () => ({ renameSync: jest.fn() }));
jest.mock("adm-zip", () => jest.fn(() => ({ extractAllTo: jest.fn() })));
jest.mock("../lib/remove", () => jest.fn());

it("can unzip template archive", () => {
  const srcZipFile = "./source/zip-file.zip";
  const destDir = "./destination";
  
  unzip(srcZipFile, destDir);

  const unzipTmpDir = path.join(os.tmpdir(), constants.unzipDirName);
  const unzippedArchiveDir = path.join(unzipTmpDir, constants.archiveName);
  const overwrite = true;

  expect(AdmZip).toHaveBeenCalledWith(srcZipFile);
  expect(AdmZip).toHaveReturnedTimes(1);
  expect(AdmZip.mock.results[0].value.extractAllTo).toHaveBeenCalledWith(
    unzipTmpDir,
    overwrite
  );

  expect(fs.renameSync).toHaveBeenCalledWith(unzippedArchiveDir, destDir);

  expect(remove).toHaveBeenCalledTimes(2);
  expect(remove).toHaveBeenCalledWith(srcZipFile);
  expect(remove).toHaveBeenCalledWith(unzipTmpDir);
});
