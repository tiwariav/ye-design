const { main } = require("wo-library/tools/cjs/storybook/index.cjs");

module.exports = {
  ...main,
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
};
