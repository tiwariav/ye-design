import { StorybookConfig } from "@storybook/react-webpack5";
import main, { getAbsolutePath } from "wo-library/tools/storybook/main";
import {
  modulesFullySpecified,
  nodeNextExtensionAlias,
} from "wo-library/tools/storybook/webpack";

const config: StorybookConfig = {
  ...main,
  addons: [...(main.addons || []), getAbsolutePath("@storybook/addon-themes")],
  webpackFinal: (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // 'PRODUCTION' is used when building the static version of storybook.
    config = modulesFullySpecified(config);
    config = nodeNextExtensionAlias(config);
    return config;
  },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
};

export default config;
