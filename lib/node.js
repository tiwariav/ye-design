/* eslint-disable unicorn/prefer-module */
const fs = require("fs");
const path = require("path");

function readPackageJSON(directory) {
  const file = path.join(directory, "package.json");
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file));
  }
  return null;
}

module.exports = {
  readPackageJSON,
};
