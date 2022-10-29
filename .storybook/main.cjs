const { main } = require("wo-library/tools/cjs/storybook.cjs");

module.exports = {
  ...main,
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
};
