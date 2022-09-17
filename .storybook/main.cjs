const { storybook } = require("wo-library/tools/cjs/storybook.js");
const { main } = storybook;

module.exports = {
  ...main,
  stories: ["../!(node_modules|svg|dist)/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
};
