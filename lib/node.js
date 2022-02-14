const fs = require("fs");
const path = require("path");

function readPackageJSON(dir) {
  const file = path.join(dir, "package.json");
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file));
  }
  return null;
}

module.exports = {
  readPackageJSON,
};
