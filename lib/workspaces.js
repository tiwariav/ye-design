/* eslint-disable unicorn/prefer-module */
const { readPackageJSON } = require("./node");
const micromatch = require("micromatch");
const path = require("path");

function extractWorkspaces(manifest) {
  const workspaces = (manifest || {}).workspaces;
  return (
    (workspaces && workspaces.packages) ||
    (Array.isArray(workspaces) ? workspaces : null)
  );
}

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
      return relativePath === "" ||
        micromatch([relativePath], workspaces).length > 0
        ? current
        : null;
    }

    previous = current;
    current = path.dirname(current);
  } while (current !== previous);

  return null;
}

function workspacePackages() {
  const workspaceRoot = findWorkspaceRoot();
  const manifest = readPackageJSON(workspaceRoot);
  return extractWorkspaces(manifest);
}

module.exports = {
  extractWorkspaces,
  findWorkspaceRoot,
  readPackageJSON,
  workspacePackages,
};
