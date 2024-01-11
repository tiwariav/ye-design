/* eslint-disable unicorn/prefer-module */
const { getConfig } = require("@tiwariav/postcss-config");

module.exports = getConfig(process.env.NODE_ENV || "development", {
  globalDataOptions: { files: ["./src/styles/media.css"] },
});
