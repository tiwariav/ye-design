/* eslint-disable unicorn/prefer-module */
const eslintConfig = require("wo-library/tools/cjs/eslint.cjs");
const { config: sharedConfig } = eslintConfig;

sharedConfig.overrides[0].parserOptions = {
  project: ["./tsconfig.json"],
  tsconfigRootDir: __dirname,
};
module.exports = sharedConfig;
