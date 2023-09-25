/* eslint-disable unicorn/prefer-module */
/* used only by storybook */

const { getFinalConfig } = require("wo-library/tools/cjs/postcss.cjs");

const config = getFinalConfig("development");
config.plugins.splice(0, 0, [
  "@csstools/postcss-global-data",
  { files: ["./src/styles/media.css"] },
]);

module.exports = config;
