const fs = require("fs");
const path = require("path");

module.exports = {
  readPackageJSON,
};

function readPackageJSON(dir) {
  const file = path.join(dir, "package.json");
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  }
  return null;
}
