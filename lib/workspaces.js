const { readPackageJSON } = require("./node");
const micromatch = require("micromatch");
const path = require("path");

module.exports = {
  extractWorkspaces,
  findWorkspaceRoot,
  readPackageJSON,
  workspacePackages,
};

/**
 * Adapted from:
 * https://github.com/yarnpkg/yarn/blob/ddf2f9ade211195372236c2f39a75b00fa18d4de/src/config.js#L612
 */
function findWorkspaceRoot(initial) {
  if (!initial) {
    initial = process.cwd();
  }
  let previous = null;
  let current = path.normalize(initial);

  do {
    const manifest = readPackageJSON(current);
    const workspaces = extractWorkspaces(manifest);

    if (workspaces) {
      const relativePath = path.relative(current, initial);
      if (
        relativePath === "" ||
        micromatch([relativePath], workspaces).length > 0
      ) {
        return current;
      } else {
        return null;
      }
    }

    previous = current;
    current = path.dirname(current);
  } while (current !== previous);

  return null;
}

function extractWorkspaces(manifest) {
  const workspaces = (manifest || {}).workspaces;
  return (
    (workspaces && workspaces.packages) ||
    (Array.isArray(workspaces) ? workspaces : null)
  );
}

function workspacePackages() {
  const workspaceRoot = findWorkspaceRoot();
  const manifest = readPackageJSON(workspaceRoot);
  return extractWorkspaces(manifest);
}
