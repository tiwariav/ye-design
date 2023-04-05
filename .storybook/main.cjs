const { main } = require("wo-library/tools/cjs/storybook/index.cjs");

module.exports = {
  ...main,
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  framework: "@storybook/react-webpack5",
};
