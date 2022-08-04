const { storybook } = require("wo-library/lib/cjs");
const { main } = storybook;

module.exports = {
  ...main,
  stories: ["../!(node_modules|svg|dist)/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
};
