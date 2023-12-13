/* eslint-disable unicorn/prefer-module */
const { getConfig } = require("wo-library/tools/cjs/postcss.cjs");
const globalData = require("@csstools/postcss-global-data");

const config = getConfig(process.env.NODE_ENV || "development");
config.plugins.splice(0, 0, globalData({ files: ["./src/styles/media.css"] }));

module.exports = config;
