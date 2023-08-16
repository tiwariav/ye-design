import { StorybookConfig } from "@storybook/react-webpack5";
import main from "wo-library/tools/storybook/main";
import {
  cssModules,
  modulesFullySpecified,
  nodeNextExtensionAlias,
} from "wo-library/tools/storybook/webpack";

const config: StorybookConfig = {
  ...main,
  addons: [...(main.addons || []), "@storybook/addon-styling"],
  webpackFinal: (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // 'PRODUCTION' is used when building the static version of storybook.
    config = cssModules(config, { configType });
    config = modulesFullySpecified(config);
    config = nodeNextExtensionAlias(config);
    return config;
  },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
};

export default config;
